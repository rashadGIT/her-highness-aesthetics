import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

const CF = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN || "";

const GALLERY_IMAGES = [
  { src: `${CF}/images/gallery/1.jpg`, alt: "Soft ombré brow result — client 1", label: "Soft Ombré Brows" },
  { src: `${CF}/images/gallery/2.jpg`, alt: "Classic lash extensions result — client 2", label: "Classic Lashes" },
  { src: `${CF}/images/gallery/3.jpg`, alt: "Soft ombré brow result — client 3", label: "Soft Ombré Brows" },
  { src: `${CF}/images/gallery/4.jpg`, alt: "Brow touch-up result — client 4", label: "Brow Touch-Up" },
  { src: `${CF}/images/gallery/5.jpg`, alt: "Classic lash extensions result — client 5", label: "Classic Lashes" },
  { src: `${CF}/images/gallery/6.jpg`, alt: "Soft ombré brow result — client 6", label: "Soft Ombré Brows" },
];

export function ResultsGallery() {
  return (
    <section className="section bg-bg" id="gallery">
      <div className="container">
        <SectionHeading
          eyebrow="Real Results"
          title="The Work Speaks"
          subtitle="Every brow and lash set is customized to your unique features. Here's what you can expect when you sit in Zee's chair."
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <StaggerItem key={i}>
              <Link href="/gallery" className="group block relative aspect-[3/4] rounded-card overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 flex items-end p-4">
                  <span className="font-sans text-xs text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.label}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            View Full Gallery
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
