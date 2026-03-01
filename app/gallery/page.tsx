import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gallery — Before & After Results",
  description:
    "Browse before and after photos of soft ombré brows and lash extensions by certified artist Zee in Dallas, TX.",
};

const GALLERY = [
  { src: "/images/gallery/1.jpg", service: "Soft Ombré Brows", alt: "Soft ombré brow result" },
  { src: "/images/gallery/2.jpg", service: "Classic Lashes", alt: "Classic lash extension result" },
  { src: "/images/gallery/3.jpg", service: "Soft Ombré Brows", alt: "Natural ombré brow result" },
  { src: "/images/gallery/4.jpg", service: "Brow Touch-Up", alt: "Brow touch-up result" },
  { src: "/images/gallery/5.jpg", service: "Classic Lashes", alt: "Classic lash extension result" },
  { src: "/images/gallery/6.jpg", service: "Soft Ombré Brows", alt: "Soft powder brow result" },
  { src: "/images/gallery/7.jpg", service: "Soft Ombré Brows", alt: "Ombré brow healed result" },
  { src: "/images/gallery/8.jpg", service: "Classic Lashes", alt: "Natural lash extension result" },
  { src: "/images/gallery/9.jpg", service: "Soft Ombré Brows", alt: "Full face ombré brow result" },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container">
          <FadeIn>
            <p className="label text-accent mb-4">Real Results</p>
            <h1 className="font-serif text-display-lg text-white mb-4">
              The Work Speaks
            </h1>
            <p className="font-sans text-white/60 text-lg max-w-xl">
              Every result is unique — tailored to each client's features, skin, and lifestyle. This is what precision artistry looks like.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section bg-bg">
        <div className="container">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY.map((img, i) => (
              <StaggerItem key={i}>
                <div className="group relative aspect-[3/4] rounded-card overflow-hidden bg-stone-100">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-sans text-xs text-white uppercase tracking-wider">
                      {img.service}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Instagram CTA */}
          <FadeIn>
            <div className="mt-16 text-center">
              <p className="font-sans text-muted mb-4">
                See more results on Instagram
              </p>
              <LinkButton
                href="https://www.instagram.com/herhighness__aesthetics/"
                external
                variant="outline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow @herhighness__aesthetics
              </LinkButton>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
