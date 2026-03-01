import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import { LinkButton } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Zee — Certified PMU & Lash Artist",
  description:
    "Meet Zee, certified ombré brow and lash artist at Her Highness Aesthetics in Dallas, TX. Learn about her training, philosophy, and passion for precision beauty.",
};

const VALUES = [
  {
    icon: "✦",
    title: "Precision Above All",
    desc: "Every brow is mapped, every lash is placed with intention. There's no such thing as 'good enough' in this chair.",
  },
  {
    icon: "✦",
    title: "Your Face, Your Rules",
    desc: "Zee works with your natural features — not against them. The goal is always the most flattering version of you.",
  },
  {
    icon: "✦",
    title: "Comfort & Care",
    desc: "This is a judgment-free space. You'll leave feeling seen, beautiful, and more confident than when you walked in.",
  },
  {
    icon: "✦",
    title: "Lasting Results",
    desc: "Zee's work is designed to last — using premium pigments, proper technique, and detailed aftercare guidance.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container">
          <FadeIn>
            <p className="label text-accent mb-4">The Artist</p>
            <h1 className="font-serif text-display-lg text-white mb-4">
              Meet Zee
            </h1>
            <p className="font-sans text-white/60 text-lg max-w-xl">
              Certified ombré brow & lash artist. Dallas-based. Client-obsessed.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-bg">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Image */}
            <FadeIn direction="left" className="sticky top-24">
              <div className="relative aspect-[4/5] rounded-card overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN || ""}/images/about-zee.jpg`}
                  alt="Zee — certified PMU and lash artist at Her Highness Aesthetics, Dallas TX"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Credentials card */}
              <div className="mt-4 card p-6">
                <h3 className="font-sans text-xs uppercase tracking-widest text-accent mb-4 font-medium">
                  Credentials
                </h3>
                <ul className="space-y-3">
                  {[
                    "Certified Permanent Makeup Artist",
                    "Ombré Powder Brow Specialist",
                    "Classic Lash Extension Certified",
                    "Bloodborne Pathogen Certified",
                    "Based in Dallas, TX",
                  ].map((cred) => (
                    <li key={cred} className="flex items-center gap-3 font-sans text-sm text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Story Content */}
            <FadeIn direction="right">
              <div className="prose-custom">
                <p className="font-sans text-xs uppercase tracking-widest text-accent mb-2 font-medium">
                  My Story
                </p>
                <h2 className="font-serif text-display-sm text-primary mb-6">
                  "My goal is simple — help you feel confident, beautiful, and effortlessly put together."
                </h2>

                <div className="space-y-4 font-sans text-muted leading-relaxed">
                  <p>
                    Hey, I'm <strong className="text-primary">Zee</strong>. I'm a certified ombré brow and lash artist based in Dallas, TX, and I started Her Highness Aesthetics because I believe every woman deserves to wake up feeling like her best self — without spending an hour in front of the mirror.
                  </p>
                  <p>
                    I fell in love with permanent makeup because of the way it changes how women carry themselves. When a client looks in the mirror after their appointment and tears up — that's why I do this. It's not just about brows. It's about confidence. It's about time freedom. It's about feeling beautiful in your own skin.
                  </p>
                  <p>
                    I'm meticulous about my craft. I study your face structure, your natural brow growth, your skin tone, and your lifestyle before I ever pick up a needle. Your results should look like you on your best day — not like anyone else's brows transplanted on your face.
                  </p>
                  <p>
                    My studio is a judgment-free zone where you can relax, be yourself, and trust that you're in good hands. I take my time, ask the right questions, and I won't stop until I'm proud to put my name on the results.
                  </p>
                  <p>
                    I'd love to meet you. Let's get your glow-up started. 💕
                  </p>
                  <p className="font-serif text-xl italic text-primary">— Zee</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <LinkButton href="/book">Book with Zee</LinkButton>
                  <LinkButton href={BUSINESS.instagram} external variant="outline">
                    Follow on Instagram
                  </LinkButton>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-sm bg-primary">
        <div className="container">
          <FadeIn>
            <p className="label text-accent text-center mb-10">What I Stand For</p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((value) => (
              <StaggerItem key={value.title}>
                <div className="flex gap-4 p-6 bg-white/5 rounded-card border border-white/10">
                  <span className="text-accent text-lg mt-0.5 flex-shrink-0">{value.icon}</span>
                  <div>
                    <h3 className="font-serif text-xl text-white mb-2">{value.title}</h3>
                    <p className="font-sans text-sm text-white/60 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Instagram Feed Embed */}
      <section className="section-sm bg-bg">
        <div className="container text-center">
          <FadeIn>
            <p className="label text-muted mb-4">Follow Along</p>
            <h2 className="font-serif text-display-sm text-primary mb-4">
              @herhighness__aesthetics
            </h2>
            <p className="font-sans text-muted mb-6">
              Follow Zee on Instagram for behind-the-scenes, client results, and availability updates.
            </p>
            <LinkButton href={BUSINESS.instagram} external>
              Follow on Instagram
            </LinkButton>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
