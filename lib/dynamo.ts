import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
  ScanCommand,
  type ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  ...(process.env.DYNAMODB_ENDPOINT
    ? { endpoint: process.env.DYNAMODB_ENDPOINT }
    : {}),
});

export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

export const BOOKINGS_TABLE = process.env.DYNAMODB_BOOKINGS_TABLE || "hha-bookings";
export const BLOCKED_DATES_TABLE =
  process.env.DYNAMODB_BLOCKED_DATES_TABLE || "hha-blocked-dates";

// ── Booking Types ────────────────────────────────────────────────
export type BookingStatus =
  | "pending_payment"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show"
  | "expired";

export interface Booking {
  bookingId: string;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  depositAmount: number;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  durationMinutes: number;
  status: BookingStatus;
  stripePaymentIntentId: string;
  stripePaymentStatus: string;
  photoUploadKey?: string;
  notes?: string;
  adminNotes?: string;
  reminderSent: boolean;
  reviewRequestSent: boolean;
}

// ── Create Booking ───────────────────────────────────────────────
export async function createBooking(booking: Booking): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: BOOKINGS_TABLE,
      Item: booking,
    })
  );
}

// ── Get Booking by ID ────────────────────────────────────────────
export async function getBookingById(
  bookingId: string
): Promise<Booking | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: BOOKINGS_TABLE,
      Key: { bookingId },
    })
  );
  return (result.Item as Booking) || null;
}

// ── Get Bookings by Date (for availability) ──────────────────────
export async function getBookingsByDate(date: string): Promise<Booking[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: BOOKINGS_TABLE,
      IndexName: "appointmentDate-index",
      KeyConditionExpression: "appointmentDate = :date",
      FilterExpression: "#s IN (:confirmed, :pending)",
      ExpressionAttributeNames: { "#s": "status" },
      ExpressionAttributeValues: {
        ":date": date,
        ":confirmed": "confirmed",
        ":pending": "pending_payment",
      },
    })
  );
  return (result.Items as Booking[]) || [];
}

// ── Get All Bookings (admin) ─────────────────────────────────────
export async function getAllBookings(
  status?: BookingStatus
): Promise<Booking[]> {
  const params: ScanCommandInput = {
    TableName: BOOKINGS_TABLE,
    ...(status
      ? {
          FilterExpression: "#s = :status",
          ExpressionAttributeNames: { "#s": "status" },
          ExpressionAttributeValues: { ":status": status },
        }
      : {}),
  };

  const result = await docClient.send(new ScanCommand(params));
  const bookings = (result.Items as Booking[]) || [];
  return bookings.sort(
    (a, b) =>
      new Date(b.appointmentDate).getTime() -
      new Date(a.appointmentDate).getTime()
  );
}

// ── Update Booking Status ────────────────────────────────────────
export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  adminNotes?: string
): Promise<void> {
  await docClient.send(
    new UpdateCommand({
      TableName: BOOKINGS_TABLE,
      Key: { bookingId },
      UpdateExpression:
        "SET #s = :status, updatedAt = :updatedAt" +
        (adminNotes ? ", adminNotes = :adminNotes" : ""),
      ExpressionAttributeNames: { "#s": "status" },
      ExpressionAttributeValues: {
        ":status": status,
        ":updatedAt": new Date().toISOString(),
        ...(adminNotes ? { ":adminNotes": adminNotes } : {}),
      },
    })
  );
}

// ── Update Stripe Payment Status ─────────────────────────────────
export async function updateBookingPayment(
  bookingId: string,
  stripePaymentStatus: string,
  status: BookingStatus
): Promise<void> {
  await docClient.send(
    new UpdateCommand({
      TableName: BOOKINGS_TABLE,
      Key: { bookingId },
      UpdateExpression:
        "SET stripePaymentStatus = :ps, #s = :status, updatedAt = :updatedAt",
      ExpressionAttributeNames: { "#s": "status" },
      ExpressionAttributeValues: {
        ":ps": stripePaymentStatus,
        ":status": status,
        ":updatedAt": new Date().toISOString(),
      },
    })
  );
}

// ── Block Date ───────────────────────────────────────────────────
export async function blockDate(date: string, reason?: string): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: BLOCKED_DATES_TABLE,
      Item: {
        date,
        sk: "block",
        reason: reason || "",
        createdAt: new Date().toISOString(),
      },
    })
  );
}

export async function unblockDate(date: string): Promise<void> {
  const { DeleteCommand } = await import("@aws-sdk/lib-dynamodb");
  await docClient.send(
    new DeleteCommand({
      TableName: BLOCKED_DATES_TABLE,
      Key: { date, sk: "block" },
    })
  );
}

export async function getBlockedDates(): Promise<string[]> {
  const result = await docClient.send(
    new ScanCommand({ TableName: BLOCKED_DATES_TABLE })
  );
  return (result.Items || []).map((item) => item.date as string);
}

export async function isDateBlocked(date: string): Promise<boolean> {
  const result = await docClient.send(
    new GetCommand({
      TableName: BLOCKED_DATES_TABLE,
      Key: { date, sk: "block" },
    })
  );
  return !!result.Item;
}
