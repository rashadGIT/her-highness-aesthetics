"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export default function CancelBookingPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;
  const [status, setStatus] = useState<"confirm" | "loading" | "done" | "error">("confirm");

  const handleCancel = async () => {
    setStatus("loading");
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled", reason: "Client requested cancellation" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="bg-primary pt-32 pb-10">
        <div className="container">
          <FadeIn>
            <h1 className="font-serif text-display-md text-white mb-2">Cancel Appointment</h1>
            <p className="font-sans text-white/60 text-lg">
              We hate to see you go, but we understand.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-bg">
        <div className="container max-w-lg mx-auto">
          <FadeIn>
            {status === "confirm" && (
              <div className="card p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl text-primary mb-3">Are you sure?</h2>
                <p className="font-sans text-muted mb-2">
                  If you cancel now, your deposit may be forfeited depending on how close your appointment is.
                </p>
                <p className="font-sans text-sm text-muted mb-8">
                  <strong className="text-primary">Rescheduling instead?</strong>{" "}
                  Contact us directly — your deposit transfers if you reschedule 48+ hours in advance.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+13469014161"
                    className="block py-3 font-sans text-sm font-semibold text-white bg-accent rounded-btn hover:bg-accent/90 transition-colors"
                  >
                    Call to Reschedule — (346) 901-4161
                  </a>
                  <button
                    onClick={handleCancel}
                    className="py-3 font-sans text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Cancel my appointment anyway
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="py-3 font-sans text-sm text-muted hover:text-primary transition-colors"
                  >
                    ← Go back
                  </button>
                </div>
              </div>
            )}

            {status === "loading" && (
              <div className="card p-8 text-center">
                <p className="font-sans text-muted">Cancelling your appointment...</p>
              </div>
            )}

            {status === "done" && (
              <div className="card p-8 text-center">
                <h2 className="font-serif text-2xl text-primary mb-3">Appointment Cancelled</h2>
                <p className="font-sans text-muted mb-6">
                  Your appointment has been cancelled. A confirmation email will be sent shortly. We hope to see you again soon!
                </p>
                <LinkButton href="/book" variant="primary">Book a New Appointment</LinkButton>
              </div>
            )}

            {status === "error" && (
              <div className="card p-8 text-center">
                <h2 className="font-serif text-2xl text-primary mb-3">Something Went Wrong</h2>
                <p className="font-sans text-muted mb-6">
                  Please call us directly to cancel: <a href="tel:+13469014161" className="text-accent">(346) 901-4161</a>
                </p>
                <Button onClick={() => setStatus("confirm")}>Try Again</Button>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
