import { SOCIAL_PROOF_STATS } from "@/lib/constants";

export function SocialProofBar() {
  return (
    <section className="bg-primary py-8 md:py-10">
      <div className="container">
        <div className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-4">
          {SOCIAL_PROOF_STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center"
            >
              <span className="font-serif text-2xl md:text-3xl font-semibold text-accent">
                {stat.value}
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-white/50 mt-1">
                {stat.label}
              </span>
            </div>
          ))}

          {/* 5-star visual */}
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-sans text-xs uppercase tracking-widest text-white/50">
              Client Rated
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
