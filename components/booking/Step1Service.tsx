import { SERVICES } from "@/lib/constants";
import { formatDuration } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface Step1Props {
  selectedServiceId: string | null;
  onSelect: (serviceId: string) => void;
}

export function Step1Service({ selectedServiceId, onSelect }: Step1Props) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-primary mb-2">Choose Your Service</h2>
      <p className="font-sans text-sm text-muted mb-6">
        Select the service you'd like to book. Each service requires a deposit to secure your spot.
      </p>

      <div className="space-y-4">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={`w-full text-left rounded-card border-2 p-5 transition-all duration-200 ${
              selectedServiceId === service.id
                ? "border-accent bg-accent/5 shadow-card"
                : "border-stone-200 bg-surface hover:border-accent/40 hover:shadow-card"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-xl text-primary">{service.name}</h3>
                  {service.badge && <Badge variant="gold">{service.badge}</Badge>}
                </div>
                <p className="font-sans text-xs italic text-accent mb-2">{service.tagline}</p>
                <p className="font-sans text-sm text-muted leading-relaxed">{service.description}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted font-sans">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDuration(service.durationMinutes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    ${service.deposit} deposit
                  </span>
                </div>
                {service.note && (
                  <p className="mt-2 font-sans text-xs text-amber-700 bg-amber-50 rounded px-2 py-1">
                    ⚠ {service.note}
                  </p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-serif text-3xl text-primary">${service.price}</span>
                <div
                  className={`mt-2 w-6 h-6 rounded-full border-2 flex items-center justify-center mx-auto transition-all duration-200 ${
                    selectedServiceId === service.id
                      ? "border-accent bg-accent"
                      : "border-stone-300"
                  }`}
                >
                  {selectedServiceId === service.id && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
