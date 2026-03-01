import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { FadeIn } from "@/components/ui/FadeIn";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const metadata: Metadata = {
  title: "Book Your Appointment",
  description:
    "Book your soft ombré brows or lash extension appointment with certified artist Zee in Dallas, TX. Secure your spot with a small deposit.",
};

export default function BookPage() {
  return (
    <>
      <section className="bg-primary pt-32 pb-10">
        <div className="container">
          <FadeIn>
            <p className="label text-accent mb-3">Secure Your Spot</p>
            <h1 className="font-serif text-display-md text-white mb-2">
              Book Your Appointment
            </h1>
            <p className="font-sans text-white/60">
              A small deposit is required to confirm your booking. Remaining balance due at your appointment.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-bg">
        <div className="container max-w-3xl mx-auto">
          <Suspense fallback={<div className="flex justify-center py-16"><LoadingSpinner className="w-10 h-10 text-accent" /></div>}>
            <BookingWizard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
