import { NextRequest, NextResponse } from "next/server";
import { getBookingById, updateBookingStatus } from "@/lib/dynamo";
import { sendCancellationEmail } from "@/lib/ses";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  // Sanitize response (don't expose admin notes to public)
  const { adminNotes: _admin, ...publicBooking } = booking;
  return NextResponse.json(publicBooking);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Admin only
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { status, adminNotes, reason } = body;

  const booking = await getBookingById(id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  await updateBookingStatus(id, status, adminNotes);

  // Send cancellation email if cancelling
  if (status === "cancelled") {
    await sendCancellationEmail(booking, reason);

    // Fire n8n cancellation webhook
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      fetch(`${n8nUrl}/cancellation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking, reason }),
      }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true });
}
