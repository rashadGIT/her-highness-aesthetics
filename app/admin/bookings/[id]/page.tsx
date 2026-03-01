import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookingById } from "@/lib/dynamo";
import { formatDate, formatTime, formatDuration } from "@/lib/utils";
import { BookingActions } from "./BookingActions";

export const dynamic = "force-dynamic";

export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/admin/bookings"
        className="font-sans text-sm text-muted hover:text-primary mb-6 inline-block"
      >
        ← Back to Bookings
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-primary">{booking.clientName}</h1>
          <p className="font-sans text-muted">{booking.serviceName}</p>
        </div>
        <span
          className={`font-sans text-sm px-3 py-1.5 rounded-full font-medium ${
            booking.status === "confirmed"
              ? "bg-success/10 text-success"
              : booking.status === "cancelled"
              ? "bg-red-50 text-red-500"
              : "bg-stone-100 text-muted"
          }`}
        >
          {booking.status.replace("_", " ").toUpperCase()}
        </span>
      </div>

      {/* Details */}
      <div className="bg-white rounded-card shadow-card overflow-hidden mb-6">
        {[
          { label: "Appointment", value: `${formatDate(booking.appointmentDate)} at ${formatTime(booking.appointmentTime)}` },
          { label: "Duration", value: formatDuration(booking.durationMinutes) },
          { label: "Service Price", value: `$${booking.servicePrice}` },
          { label: "Deposit Paid", value: `$${booking.depositAmount} ✓` },
          { label: "Balance Due", value: `$${booking.servicePrice - booking.depositAmount}` },
          { label: "Email", value: booking.clientEmail },
          { label: "Phone", value: booking.clientPhone },
          { label: "Stripe ID", value: booking.stripePaymentIntentId },
          { label: "Booked On", value: new Date(booking.createdAt).toLocaleDateString() },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center px-6 py-3.5 border-b border-stone-100 last:border-0"
          >
            <span className="font-sans text-xs text-muted uppercase tracking-wider w-36 flex-shrink-0">
              {row.label}
            </span>
            <span className="font-sans text-sm text-primary">{row.value}</span>
          </div>
        ))}
        {booking.notes && (
          <div className="px-6 py-3.5 border-b border-stone-100">
            <span className="font-sans text-xs text-muted uppercase tracking-wider block mb-1">Client Notes</span>
            <span className="font-sans text-sm text-primary">{booking.notes}</span>
          </div>
        )}
      </div>

      {/* Admin Actions */}
      <BookingActions booking={booking} />
    </div>
  );
}
