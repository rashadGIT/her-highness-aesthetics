import { getAllBookings, BookingStatus } from "@/lib/dynamo";
import { formatDate, formatTime } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<BookingStatus, string> = {
  confirmed: "bg-success/10 text-success",
  pending_payment: "bg-yellow-50 text-yellow-700",
  cancelled: "bg-red-50 text-red-500",
  completed: "bg-blue-50 text-blue-600",
  no_show: "bg-stone-100 text-muted",
  expired: "bg-stone-100 text-muted",
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  pending_payment: "Pending",
  cancelled: "Cancelled",
  completed: "Completed",
  no_show: "No Show",
  expired: "Expired",
};

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-primary mb-8">All Bookings</h1>

      <div className="bg-white rounded-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                {["Client", "Service", "Date & Time", "Status", "Deposit", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-sans text-xs uppercase tracking-wider text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {bookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-sans text-sm font-medium text-primary">
                      {booking.clientName}
                    </p>
                    <p className="font-sans text-xs text-muted">{booking.clientEmail}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-sans text-sm text-primary">{booking.serviceName}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-sans text-sm text-primary">
                      {formatDate(booking.appointmentDate)}
                    </p>
                    <p className="font-sans text-xs text-accent">
                      {formatTime(booking.appointmentTime)}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-sans text-xs px-2 py-1 rounded-full ${
                        STATUS_STYLES[booking.status]
                      }`}
                    >
                      {STATUS_LABELS[booking.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-sans text-sm text-primary">${booking.depositAmount}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/bookings/${booking.bookingId}`}
                      className="font-sans text-xs text-accent hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="font-sans text-muted">No bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
