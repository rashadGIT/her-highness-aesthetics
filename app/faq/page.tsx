import type { Metadata } from "next";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { FadeIn } from "@/components/ui/FadeIn";
import { LinkButton } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about ombré brows, lash extensions, booking, prep, and aftercare at Her Highness Aesthetics in Dallas, TX.",
};

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container">
          <FadeIn>
            <p className="label text-accent mb-4">Got Questions?</p>
            <h1 className="font-serif text-display-lg text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="font-sans text-white/60 text-lg max-w-xl">
              Everything you need to know before your appointment. Still have a question? Reach out — Zee's happy to help.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Content — using full accordion without limit */}
      <FAQAccordion />

      {/* Still have questions? */}
      <section className="section-sm bg-surface border-t border-stone-100">
        <div className="container text-center">
          <FadeIn>
            <h2 className="font-serif text-display-sm text-primary mb-4">
              Still Have Questions?
            </h2>
            <p className="font-sans text-muted mb-8 max-w-md mx-auto">
              Don't hesitate to reach out. Zee responds to all messages personally.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LinkButton href="/contact">Send a Message</LinkButton>
              <LinkButton href={BUSINESS.instagram} external variant="outline">
                DM on Instagram
              </LinkButton>
              <LinkButton href={BUSINESS.phoneHref} variant="secondary">
                Call {BUSINESS.phone}
              </LinkButton>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
