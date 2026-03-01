import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { BUSINESS, HOURS } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Her Highness Aesthetics in Dallas, TX. Book an appointment, ask a question, or just say hello.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container">
          <FadeIn>
            <p className="label text-accent mb-4">Reach Out</p>
            <h1 className="font-serif text-display-lg text-white mb-4">
              Let's Connect
            </h1>
            <p className="font-sans text-white/60 text-lg max-w-xl">
              Questions, custom requests, or just want to say hello? Send a message and Zee will get back to you within 24 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-bg">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact Form */}
            <FadeIn>
              <ContactForm />
            </FadeIn>

            {/* Info */}
            <FadeIn delay={0.1}>
              <div className="space-y-8">
                {/* Hours */}
                <div>
                  <h2 className="font-serif text-2xl text-primary mb-4">Hours</h2>
                  <div className="card p-6">
                    {HOURS.map((h) => (
                      <div
                        key={h.day}
                        className="flex justify-between py-2.5 border-b border-stone-100 last:border-0"
                      >
                        <span className="font-sans text-sm text-muted">{h.day}</span>
                        <span
                          className={`font-sans text-sm font-medium ${
                            h.open ? "text-primary" : "text-stone-300"
                          }`}
                        >
                          {h.open ? `${h.open} – ${h.close}` : "Closed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Contact */}
                <div>
                  <h2 className="font-serif text-2xl text-primary mb-4">Direct Contact</h2>
                  <div className="card p-6 space-y-4">
                    <a
                      href={BUSINESS.phoneHref}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-sans text-xs text-muted">Phone</p>
                        <p className="font-sans text-sm font-medium text-primary group-hover:text-accent transition-colors">
                          {BUSINESS.phone}
                        </p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-sans text-xs text-muted">Email</p>
                        <p className="font-sans text-sm font-medium text-primary group-hover:text-accent transition-colors">
                          {BUSINESS.email}
                        </p>
                      </div>
                    </a>
                    <a
                      href={BUSINESS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-sans text-xs text-muted">Instagram</p>
                        <p className="font-sans text-sm font-medium text-primary group-hover:text-accent transition-colors">
                          {BUSINESS.instagramHandle}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Location note */}
                <div className="bg-blush/20 border border-blush/40 rounded-card p-4">
                  <p className="font-sans text-sm text-primary">
                    <strong>📍 Dallas, TX 75235</strong><br />
                    <span className="text-muted">Exact studio address provided upon booking confirmation.</span>
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
