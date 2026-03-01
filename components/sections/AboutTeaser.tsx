import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { LinkButton } from "@/components/ui/Button";

export function AboutTeaser() {
  return (
    <section className="section bg-primary overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative aspect-[4/5] rounded-card overflow-hidden">
              <div className="absolute inset-0 bg-primary/30 z-10" />
              <Image
                src="/images/about-zee.jpg"
                alt="Zee — certified ombré brow and lash artist at Her Highness Aesthetics"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gold frame accent */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-accent rounded-sm z-20" />
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right">
            <div>
              <p className="label text-accent mb-4">Meet Your Artist</p>
              <h2 className="font-serif text-display-md text-white mb-6">
                Precision. Care.{" "}
                <span className="italic">Confidence.</span>
              </h2>
              <p className="font-sans text-white/70 leading-relaxed mb-5">
                Hey, I'm <strong className="text-white">Zee</strong> — a certified ombré brow and lash artist based in Dallas, TX. My goal is simple: help you feel confident, beautiful, and effortlessly put together every single day.
              </p>
              <p className="font-sans text-white/70 leading-relaxed mb-8">
                Every client who sits in my chair gets my full attention, my honest expertise, and results I'm proud to put my name on. No cookie-cutter brows. No rush. Just you, your features, and the most flattering version of your natural beauty.
              </p>

              {/* Credentials */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: "🏆", label: "Certified PMU Artist" },
                  { icon: "✨", label: "Ombré Brow Specialist" },
                  { icon: "💖", label: "Client-First Approach" },
                  { icon: "📍", label: "Dallas, TX Based" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-sans text-sm text-white/60">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <LinkButton href="/about" variant="outline">
                  Read My Full Story
                </LinkButton>
                <LinkButton href="/book" variant="ghost">
                  Book with Zee
                </LinkButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
