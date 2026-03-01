import { NextRequest, NextResponse } from "next/server";
import { getBookingsByDate, isDateBlocked } from "@/lib/dynamo";
import { generateTimeSlots, isBusinessOpen } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date"); // YYYY-MM-DD
  const serviceId = searchParams.get("serviceId");

  if (!date || !serviceId) {
    return NextResponse.json(
      { error: "date and serviceId are required" },
      { status: 400 }
    );
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  // Check if it's a business day
  const dayNum = new Date(date + "T12:00:00").getDay();
  if (!isBusinessOpen(dayNum)) {
    return NextResponse.json({ slots: [], reason: "closed" });
  }

  // Check if date is blocked
  const blocked = await isDateBlocked(date);
  if (blocked) {
    return NextResponse.json({ slots: [], reason: "blocked" });
  }

  // Get service duration
  const service = SERVICES.find((s) => s.id === serviceId);
  if (!service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }

  // Get existing bookings for this date
  const existingBookings = await getBookingsByDate(date);
  const bookedTimes = existingBookings.map((b) => b.appointmentTime);

  // Generate available slots
  const slots = generateTimeSlots(dayNum, service.durationMinutes, bookedTimes);

  return NextResponse.json({ slots, date, serviceId });
}
