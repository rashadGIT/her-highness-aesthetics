import { getAllBookings } from "@/lib/dynamo";
import { formatDate, formatTime } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const allBookings = await getAllBookings();
  const today = new Date().toISOString().split("T")[0];

  const upcoming = allBookings.filter(
    (b) => b.appointmentDate >= today && b.status === "confirmed"
  );
  const todayBookings = upcoming.filter((b) => b.appointmentDate === today);
  const totalRevenue = allBookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + b.depositAmount, 0);

  const stats = [
    { label: "Today's Appointments", value: todayBookings.length },
    { label: "Upcoming Confirmed", value: upcoming.length },
    { label: "Total Bookings", value: allBookings.length },
    { label: "Deposits Collected", value: `$${totalRevenue}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-primary mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-card p-5 shadow-card">
            <p className="font-sans text-xs text-muted uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <p className="font-serif text-3xl text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Today's appointments */}
      <div className="bg-white rounded-card shadow-card overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-serif text-xl text-primary">
            Today — {formatDate(today)}
          </h2>
          <Link href="/admin/bookings" className="font-sans text-sm text-accent hover:underline">
            View all →
          </Link>
        </div>

        {todayBookings.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="font-sans text-muted">No appointments today</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {todayBookings
              .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime))
              .map((booking) => (
                <Link
                  key={booking.bookingId}
                  href={`/admin/bookings/${booking.bookingId}`}
                  className="flex items-center px-6 py-4 hover:bg-stone-50 transition-colors"
                >
                  <div className="w-20 flex-shrink-0">
                    <span className="font-sans text-sm font-semibold text-accent">
                      {formatTime(booking.appointmentTime)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-sm font-medium text-primary">
                      {booking.clientName}
                    </p>
                    <p className="font-sans text-xs text-muted">{booking.serviceName}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-xs px-2 py-1 rounded-full bg-success/10 text-success">
                      Confirmed
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>

      {/* Upcoming */}
      <div className="bg-white rounded-card shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <h2 className="font-serif text-xl text-primary">Upcoming Appointments</h2>
        </div>

        {upcoming.filter((b) => b.appointmentDate > today).length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="font-sans text-muted">No upcoming appointments</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {upcoming
              .filter((b) => b.appointmentDate > today)
              .slice(0, 10)
              .map((booking) => (
                <Link
                  key={booking.bookingId}
                  href={`/admin/bookings/${booking.bookingId}`}
                  className="flex items-center px-6 py-4 hover:bg-stone-50 transition-colors"
                >
                  <div className="w-36 flex-shrink-0">
                    <p className="font-sans text-xs text-muted">
                      {formatDate(booking.appointmentDate)}
                    </p>
                    <p className="font-sans text-sm font-semibold text-accent">
                      {formatTime(booking.appointmentTime)}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-sm font-medium text-primary">
                      {booking.clientName}
                    </p>
                    <p className="font-sans text-xs text-muted">{booking.serviceName}</p>
                  </div>
                  <div>
                    <span className="font-sans text-xs text-muted">
                      ${booking.depositAmount} paid
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
