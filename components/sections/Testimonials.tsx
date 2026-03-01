"use client";

import { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-accent" : "text-stone-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-primary" id="testimonials">
      <div className="container">
        <SectionHeading
          eyebrow="Client Love"
          title="What They're Saying"
          dark
          subtitle="Real words from real clients. No filters, no edits — just honest feedback from women who sat in Zee's chair."
        />

        {/* Desktop: grid */}
        <div className="hidden md:block">
          <StaggerContainer className="grid grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.id}>
                <div className="bg-white/5 border border-white/10 rounded-card p-8 hover:bg-white/10 transition-colors duration-300">
                  <StarRating rating={t.rating} />
                  <p className="font-serif text-lg italic text-white/90 leading-relaxed mt-4 mb-6">
                    "{t.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-sans font-semibold text-white text-sm">{t.name}</p>
                      <p className="font-sans text-xs text-accent">{t.service}</p>
                    </div>
                    <p className="font-sans text-xs text-white/30">{t.date}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <div className="bg-white/5 border border-white/10 rounded-card p-8">
            <StarRating rating={TESTIMONIALS[active].rating} />
            <p className="font-serif text-xl italic text-white/90 leading-relaxed mt-4 mb-6">
              "{TESTIMONIALS[active].text}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans font-semibold text-white text-sm">
                  {TESTIMONIALS[active].name}
                </p>
                <p className="font-sans text-xs text-accent">{TESTIMONIALS[active].service}</p>
              </div>
              <p className="font-sans text-xs text-white/30">{TESTIMONIALS[active].date}</p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === active ? "bg-accent w-6" : "bg-white/30"
                }`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://g.page/r/herhighnessaesthetics/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm text-white/60 hover:text-accent transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            Leave a Google Review
          </a>
        </div>
      </div>
    </section>
  );
}
