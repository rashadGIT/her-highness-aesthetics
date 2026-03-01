import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { createBookingSchema } from "@/lib/validators";
import { createBooking, isDateBlocked, getBookingsByDate } from "@/lib/dynamo";
import { sendBookingConfirmation, sendAdminNewBooking } from "@/lib/ses";
import { SERVICES } from "@/lib/constants";
import { isBusinessOpen } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createBookingSchema.parse(body);

    // Validate service exists
    const service = SERVICES.find((s) => s.id === data.serviceId);
    if (!service) {
      return NextResponse.json({ error: "Invalid service" }, { status: 400 });
    }

    // Validate business day
    const dayNum = new Date(data.appointmentDate + "T12:00:00").getDay();
    if (!isBusinessOpen(dayNum)) {
      return NextResponse.json(
        { error: "Selected date is not a business day" },
        { status: 400 }
      );
    }

    // Validate not blocked
    const blocked = await isDateBlocked(data.appointmentDate);
    if (blocked) {
      return NextResponse.json(
        { error: "Selected date is not available" },
        { status: 409 }
      );
    }

    // Check for slot conflicts
    const existingBookings = await getBookingsByDate(data.appointmentDate);
    const slotTaken = existingBookings.some(
      (b) => b.appointmentTime === data.appointmentTime
    );
    if (slotTaken) {
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 }
      );
    }

    // Create booking
    const bookingId = uuidv4();
    const clientName = `${data.clientInfo.firstName} ${data.clientInfo.lastName}`;

    const booking = {
      bookingId,
      createdAt: new Date().toISOString(),
      clientName,
      clientEmail: data.clientInfo.email,
      clientPhone: data.clientInfo.phone,
      serviceId: data.serviceId,
      serviceName: service.name,
      servicePrice: service.price,
      depositAmount: service.deposit,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      durationMinutes: service.durationMinutes,
      status: "confirmed" as const,
      stripePaymentIntentId: data.stripePaymentIntentId,
      stripePaymentStatus: "succeeded",
      photoUploadKey: data.clientInfo.photoKey,
      notes: data.clientInfo.notes || "",
      adminNotes: "",
      reminderSent: false,
      reviewRequestSent: false,
    };

    await createBooking(booking);

    // Send emails (parallel)
    await Promise.all([
      sendBookingConfirmation(booking),
      sendAdminNewBooking(booking),
    ]);

    // Fire n8n webhook (non-blocking)
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      fetch(`${n8nUrl}/new-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      }).catch(() => {});
    }

    return NextResponse.json({ bookingId, status: "confirmed" }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
    }
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
