import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { formatDuration } from "@/lib/utils";

export function ServicesGrid() {
  return (
    <section className="section bg-bg" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="What We Offer"
          title="Signature Services"
          subtitle="Every service is designed to enhance your natural beauty — not replace it. Precision artistry, personalized to you."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.id}>
              <div className="card p-8 flex flex-col h-full group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                {/* Gold top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge */}
                {service.badge && (
                  <div className="mb-4">
                    <Badge variant="gold">{service.badge}</Badge>
                  </div>
                )}

                {/* Price */}
                <div className="mb-4">
                  <span className="font-serif text-4xl font-light text-primary">
                    ${service.price}
                  </span>
                  {service.deposit > 0 && (
                    <span className="font-sans text-xs text-muted ml-2">
                      ${service.deposit} deposit to book
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-serif text-2xl font-semibold text-primary mb-2">
                  {service.name}
                </h3>

                {/* Tagline */}
                <p className="font-sans text-sm text-accent italic mb-4">
                  {service.tagline}
                </p>

                {/* Divider */}
                <div className="divider mb-4" />

                {/* Description */}
                <p className="font-sans text-sm text-muted leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Duration */}
                <div className="mt-6 mb-6 flex items-center gap-2 text-muted">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-sans text-xs">
                    {formatDuration(service.durationMinutes)}
                  </span>
                </div>

                {service.note && (
                  <p className="font-sans text-xs text-blush/80 bg-blush/20 rounded px-3 py-2 mb-4">
                    ⚠ {service.note}
                  </p>
                )}

                {/* CTA */}
                <Link
                  href={`/book?service=${service.id}`}
                  className="block text-center py-3 border border-accent text-accent font-sans font-semibold text-sm rounded-btn transition-all duration-200 hover:bg-accent hover:text-white"
                >
                  Book This Service →
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View all services link */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="font-sans text-sm text-muted hover:text-accent transition-colors underline underline-offset-4"
          >
            View full service details &amp; aftercare →
          </Link>
        </div>
      </div>
    </section>
  );
}
