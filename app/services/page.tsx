import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { formatDuration } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Soft ombré powder brows ($300), classic lash extensions ($65), and brow touch-ups ($100) in Dallas, TX by certified artist Zee.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container">
          <FadeIn>
            <p className="label text-accent mb-4">What We Offer</p>
            <h1 className="font-serif text-display-lg text-white mb-4">
              Services & Pricing
            </h1>
            <p className="font-sans text-white/60 text-lg max-w-xl">
              Every service includes a personal consultation with Zee, customized to your unique features and goals.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section bg-bg">
        <div className="container">
          <div className="space-y-8">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.1}>
                <div className="card overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Left: Price + CTA */}
                    <div className="bg-primary p-8 flex flex-col justify-between">
                      <div>
                        {service.badge && (
                          <Badge variant="gold" className="mb-4">
                            {service.badge}
                          </Badge>
                        )}
                        <p className="font-sans text-xs uppercase tracking-widest text-white/40 mb-2">
                          Investment
                        </p>
                        <p className="font-serif text-5xl font-light text-white mb-1">
                          ${service.price}
                        </p>
                        <p className="font-sans text-sm text-accent">
                          ${service.deposit} deposit to book
                        </p>
                        <p className="font-sans text-xs text-white/40 mt-1">
                          Remaining ${service.price - service.deposit} due at appointment
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-white/50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-sans text-xs">
                            {formatDuration(service.durationMinutes)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-8">
                        <LinkButton
                          href={`/book?service=${service.id}`}
                          variant="outline"
                          className="w-full justify-center"
                        >
                          Book This Service
                        </LinkButton>
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="md:col-span-2 p-8">
                      <h2 className="font-serif text-display-sm text-primary mb-2">
                        {service.name}
                      </h2>
                      <p className="font-sans text-accent italic mb-4">
                        {service.tagline}
                      </p>
                      <p className="font-sans text-muted leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {service.note && (
                        <div className="bg-blush/20 border border-blush rounded-lg px-4 py-3 mb-6">
                          <p className="font-sans text-sm text-primary">
                            ⚠ {service.note}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* What to Expect */}
                        <div>
                          <h3 className="font-sans text-xs uppercase tracking-widest text-primary mb-3 font-medium">
                            What to Expect
                          </h3>
                          <ul className="space-y-2">
                            {service.whatToExpect.map((item, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <span className="mt-1 w-4 h-4 flex-shrink-0 text-accent">
                                  <svg viewBox="0 0 16 16" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.707 6.707a1 1 0 00-1.414-1.414L7 8.586 5.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span className="font-sans text-sm text-muted">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Prep Instructions */}
                        <div>
                          <h3 className="font-sans text-xs uppercase tracking-widest text-primary mb-3 font-medium">
                            Before Your Appointment
                          </h3>
                          <ul className="space-y-2">
                            {service.prepInstructions.map((item, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <span className="mt-1 text-accent text-xs">→</span>
                                <span className="font-sans text-sm text-muted">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Healing note */}
                      <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-2">
                        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        <span className="font-sans text-sm text-muted">
                          <strong className="text-primary">Recovery:</strong> {service.healing}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
