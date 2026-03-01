/**
 * Seed script — inserts mock bookings into DynamoDB Local
 * Usage: node scripts/seed-bookings.mjs
 * Requires DynamoDB Local running: docker start hha-dynamodb
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
  credentials: { accessKeyId: "local", secretAccessKey: "local" },
});
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "hha-bookings";

// Today: 2026-03-01 (Sunday)
// Zee works: Mon, Sat, Sun
const BOOKINGS = [
  // ── TODAY (Sunday Mar 1) ──────────────────────────────────────
  {
    bookingId: "bk-001",
    createdAt: "2026-02-25T14:32:00.000Z",
    clientName: "Aaliyah Thomas",
    clientEmail: "aaliyah.thomas@gmail.com",
    clientPhone: "(214) 555-0142",
    serviceId: "soft-ombre-brows",
    serviceName: "Soft Ombré Brows",
    servicePrice: 300,
    depositAmount: 50,
    appointmentDate: "2026-03-01",
    appointmentTime: "10:00",
    durationMinutes: 180,
    status: "confirmed",
    stripePaymentIntentId: "pi_mock_001",
    stripePaymentStatus: "succeeded",
    notes: "First time getting brows done. Wants a natural look.",
    reminderSent: true,
    reviewRequestSent: false,
  },
  {
    bookingId: "bk-002",
    createdAt: "2026-02-26T09:15:00.000Z",
    clientName: "Jasmine Rivera",
    clientEmail: "jasmine.r@outlook.com",
    clientPhone: "(469) 555-0287",
    serviceId: "classic-lashes",
    serviceName: "Classic Lash Extensions",
    servicePrice: 65,
    depositAmount: 20,
    appointmentDate: "2026-03-01",
    appointmentTime: "14:00",
    durationMinutes: 120,
    status: "confirmed",
    stripePaymentIntentId: "pi_mock_002",
    stripePaymentStatus: "succeeded",
    notes: "",
    reminderSent: true,
    reviewRequestSent: false,
  },

  // ── MONDAY Mar 2 ─────────────────────────────────────────────
  {
    bookingId: "bk-003",
    createdAt: "2026-02-27T11:00:00.000Z",
    clientName: "Destiny Williams",
    clientEmail: "destiny.w@gmail.com",
    clientPhone: "(972) 555-0391",
    serviceId: "brow-touch-up",
    serviceName: "Brow Touch-Up",
    servicePrice: 100,
    depositAmount: 25,
    appointmentDate: "2026-03-02",
    appointmentTime: "11:00",
    durationMinutes: 90,
    status: "confirmed",
    stripePaymentIntentId: "pi_mock_003",
    stripePaymentStatus: "succeeded",
    notes: "Had ombré brows done 8 weeks ago.",
    reminderSent: false,
    reviewRequestSent: false,
  },

  // ── SATURDAY Mar 7 ───────────────────────────────────────────
  {
    bookingId: "bk-004",
    createdAt: "2026-02-28T16:45:00.000Z",
    clientName: "Kayla Johnson",
    clientEmail: "kayla.j@icloud.com",
    clientPhone: "(214) 555-0456",
    serviceId: "soft-ombre-brows",
    serviceName: "Soft Ombré Brows",
    servicePrice: 300,
    depositAmount: 50,
    appointmentDate: "2026-03-07",
    appointmentTime: "09:30",
    durationMinutes: 180,
    status: "confirmed",
    stripePaymentIntentId: "pi_mock_004",
    stripePaymentStatus: "succeeded",
    notes: "Allergic to latex gloves — please use nitrile.",
    reminderSent: false,
    reviewRequestSent: false,
  },
  {
    bookingId: "bk-005",
    createdAt: "2026-02-28T18:20:00.000Z",
    clientName: "Monique Davis",
    clientEmail: "monique.d@gmail.com",
    clientPhone: "(469) 555-0512",
    serviceId: "classic-lashes",
    serviceName: "Classic Lash Extensions",
    servicePrice: 65,
    depositAmount: 20,
    appointmentDate: "2026-03-07",
    appointmentTime: "13:00",
    durationMinutes: 120,
    status: "confirmed",
    stripePaymentIntentId: "pi_mock_005",
    stripePaymentStatus: "succeeded",
    notes: "",
    reminderSent: false,
    reviewRequestSent: false,
  },

  // ── SUNDAY Mar 8 ─────────────────────────────────────────────
  {
    bookingId: "bk-006",
    createdAt: "2026-03-01T10:00:00.000Z",
    clientName: "Brittany Moore",
    clientEmail: "bmoore22@gmail.com",
    clientPhone: "(817) 555-0634",
    serviceId: "soft-ombre-brows",
    serviceName: "Soft Ombré Brows",
    servicePrice: 300,
    depositAmount: 50,
    appointmentDate: "2026-03-08",
    appointmentTime: "14:00",
    durationMinutes: 180,
    status: "pending_payment",
    stripePaymentIntentId: "pi_mock_006",
    stripePaymentStatus: "requires_payment_method",
    notes: "",
    reminderSent: false,
    reviewRequestSent: false,
  },

  // ── SATURDAY Mar 14 ──────────────────────────────────────────
  {
    bookingId: "bk-007",
    createdAt: "2026-02-20T13:10:00.000Z",
    clientName: "Tiffany Brooks",
    clientEmail: "tiffany.brooks@yahoo.com",
    clientPhone: "(214) 555-0721",
    serviceId: "soft-ombre-brows",
    serviceName: "Soft Ombré Brows",
    servicePrice: 300,
    depositAmount: 50,
    appointmentDate: "2026-03-14",
    appointmentTime: "10:00",
    durationMinutes: 180,
    status: "confirmed",
    stripePaymentIntentId: "pi_mock_007",
    stripePaymentStatus: "succeeded",
    notes: "Wants to go slightly darker than natural brow color.",
    reminderSent: false,
    reviewRequestSent: false,
  },

  // ── COMPLETED — last week ─────────────────────────────────────
  {
    bookingId: "bk-008",
    createdAt: "2026-02-10T09:00:00.000Z",
    clientName: "Simone Carter",
    clientEmail: "simone.c@gmail.com",
    clientPhone: "(972) 555-0823",
    serviceId: "soft-ombre-brows",
    serviceName: "Soft Ombré Brows",
    servicePrice: 300,
    depositAmount: 50,
    appointmentDate: "2026-02-23",
    appointmentTime: "10:00",
    durationMinutes: 180,
    status: "completed",
    stripePaymentIntentId: "pi_mock_008",
    stripePaymentStatus: "succeeded",
    notes: "",
    adminNotes: "Great client, healed beautifully. Scheduled touch-up.",
    reminderSent: true,
    reviewRequestSent: true,
  },
  {
    bookingId: "bk-009",
    createdAt: "2026-02-12T14:30:00.000Z",
    clientName: "Naomi Washington",
    clientEmail: "naomi.w@hotmail.com",
    clientPhone: "(469) 555-0934",
    serviceId: "classic-lashes",
    serviceName: "Classic Lash Extensions",
    servicePrice: 65,
    depositAmount: 20,
    appointmentDate: "2026-02-22",
    appointmentTime: "13:00",
    durationMinutes: 120,
    status: "completed",
    stripePaymentIntentId: "pi_mock_009",
    stripePaymentStatus: "succeeded",
    notes: "",
    reminderSent: true,
    reviewRequestSent: true,
  },
  {
    bookingId: "bk-010",
    createdAt: "2026-02-05T11:00:00.000Z",
    clientName: "Keisha Harris",
    clientEmail: "keisha.h@gmail.com",
    clientPhone: "(214) 555-1045",
    serviceId: "brow-touch-up",
    serviceName: "Brow Touch-Up",
    servicePrice: 100,
    depositAmount: 25,
    appointmentDate: "2026-02-16",
    appointmentTime: "11:00",
    durationMinutes: 90,
    status: "completed",
    stripePaymentIntentId: "pi_mock_010",
    stripePaymentStatus: "succeeded",
    notes: "",
    reminderSent: true,
    reviewRequestSent: true,
  },

  // ── CANCELLED ─────────────────────────────────────────────────
  {
    bookingId: "bk-011",
    createdAt: "2026-02-18T15:00:00.000Z",
    clientName: "Amber Lewis",
    clientEmail: "amber.l@gmail.com",
    clientPhone: "(817) 555-1156",
    serviceId: "soft-ombre-brows",
    serviceName: "Soft Ombré Brows",
    servicePrice: 300,
    depositAmount: 50,
    appointmentDate: "2026-02-28",
    appointmentTime: "10:00",
    durationMinutes: 180,
    status: "cancelled",
    stripePaymentIntentId: "pi_mock_011",
    stripePaymentStatus: "refunded",
    notes: "",
    adminNotes: "Client cancelled 24hrs before. Deposit refunded.",
    reminderSent: true,
    reviewRequestSent: false,
  },

  // ── NO SHOW ───────────────────────────────────────────────────
  {
    bookingId: "bk-012",
    createdAt: "2026-02-15T10:00:00.000Z",
    clientName: "Crystal Young",
    clientEmail: "crystal.y@gmail.com",
    clientPhone: "(972) 555-1267",
    serviceId: "classic-lashes",
    serviceName: "Classic Lash Extensions",
    servicePrice: 65,
    depositAmount: 20,
    appointmentDate: "2026-02-28",
    appointmentTime: "13:00",
    durationMinutes: 120,
    status: "no_show",
    stripePaymentIntentId: "pi_mock_012",
    stripePaymentStatus: "succeeded",
    notes: "",
    adminNotes: "Did not show, did not respond to reminder.",
    reminderSent: true,
    reviewRequestSent: false,
  },
];

async function seed() {
  console.log(`\n🌱 Seeding ${BOOKINGS.length} bookings into local DynamoDB...\n`);
  let success = 0;

  for (const booking of BOOKINGS) {
    try {
      await doc.send(new PutCommand({ TableName: TABLE, Item: booking }));
      console.log(`  ✅ ${booking.bookingId} — ${booking.clientName} (${booking.appointmentDate} ${booking.appointmentTime}) [${booking.status}]`);
      success++;
    } catch (err) {
      console.error(`  ❌ ${booking.bookingId} failed:`, err.message);
    }
  }

  console.log(`\n✨ Done — ${success}/${BOOKINGS.length} bookings inserted`);
  console.log("   Refresh /admin to see the data\n");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  console.error("Is DynamoDB Local running? → docker start hha-dynamodb");
  process.exit(1);
});
