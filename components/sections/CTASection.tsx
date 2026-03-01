import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { BUSINESS } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="section-sm bg-accent relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
            radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative container text-center">
        <FadeIn>
          <p className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4">
            Limited Availability
          </p>
          <h2 className="font-serif text-display-md text-white mb-4">
            Ready for Your Transformation?
          </h2>
          <p className="font-sans text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Spots fill up fast — especially on Saturdays. Book your appointment now and wake up ready every day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <LinkButton
              href="/book"
              variant="secondary"
              size="lg"
              className="bg-black text-accent hover:bg-black/90"
            >
              Book Your Appointment →
            </LinkButton>
            <LinkButton
              href={BUSINESS.instagram}
              external
              variant="ghost"
              size="lg"
              className="border-white/60 text-white hover:border-white hover:bg-white/10"
            >
              DM on Instagram
            </LinkButton>
          </div>
          <p className="mt-6 font-sans text-sm text-white/60">
            Or call us at{" "}
            <a href={BUSINESS.phoneHref} className="text-white hover:text-white/80 underline">
              {BUSINESS.phone}
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
