import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookingById } from "@/lib/dynamo";
import { formatDate, formatTime, formatDuration, getGoogleCalendarUrl } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookingConfirmationPage({ params }: Props) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) notFound();

  const service = SERVICES.find((s) => s.id === booking.serviceId);
  const calUrl = getGoogleCalendarUrl({
    serviceName: booking.serviceName,
    appointmentDate: booking.appointmentDate,
    appointmentTime: booking.appointmentTime,
    durationMinutes: booking.durationMinutes,
  });

  return (
    <>
      <section className="bg-primary pt-32 pb-10">
        <div className="container text-center">
          <FadeIn>
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif text-display-md text-white mb-2">
              You're Booked! ✨
            </h1>
            <p className="font-sans text-white/60 text-lg">
              A confirmation has been sent to{" "}
              <strong className="text-white">{booking.clientEmail}</strong>
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-bg">
        <div className="container max-w-2xl mx-auto">
          <FadeIn>
            {/* Booking summary card */}
            <div className="card overflow-hidden mb-6">
              <div className="bg-primary/5 border-b border-stone-100 px-6 py-4">
                <p className="font-sans text-xs uppercase tracking-widest text-muted">
                  Booking Confirmation
                </p>
                <p className="font-sans text-xs text-muted mt-0.5">
                  #{booking.bookingId.split("-")[0].toUpperCase()}
                </p>
              </div>

              <div className="divide-y divide-stone-100">
                {[
                  { label: "Service", value: booking.serviceName },
                  { label: "Date", value: formatDate(booking.appointmentDate) },
                  { label: "Time", value: formatTime(booking.appointmentTime) },
                  { label: "Duration", value: formatDuration(booking.durationMinutes) },
                  { label: "Client", value: booking.clientName },
                  { label: "Deposit Paid", value: `$${booking.depositAmount}` },
                  {
                    label: "Balance Due at Appointment",
                    value: `$${booking.servicePrice - booking.depositAmount}`,
                  },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center px-6 py-4">
                    <span className="font-sans text-sm text-muted">{row.label}</span>
                    <span className="font-sans text-sm font-medium text-primary">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar button */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <LinkButton href={calUrl} external variant="outline" className="flex-1 justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add to Google Calendar
              </LinkButton>
              <Link
                href={`/booking/${booking.bookingId}/cancel`}
                className="flex-1 text-center py-3 font-sans text-sm text-muted hover:text-red-500 transition-colors"
              >
                Need to cancel?
              </Link>
            </div>

            {/* Prep instructions */}
            {service?.prepInstructions && (
              <div className="card p-6 mb-6">
                <h2 className="font-serif text-xl text-primary mb-4">
                  Before Your Appointment
                </h2>
                <ul className="space-y-2">
                  {service.prepInstructions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">→</span>
                      <span className="font-sans text-sm text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instagram follow */}
            <div className="text-center">
              <p className="font-sans text-sm text-muted mb-3">
                Follow along for tips, inspiration, and availability updates
              </p>
              <LinkButton
                href="https://www.instagram.com/herhighness__aesthetics/"
                external
                variant="outline"
              >
                Follow @herhighness__aesthetics
              </LinkButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
