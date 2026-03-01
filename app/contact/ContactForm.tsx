"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/validators";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-btn border border-stone-200 font-sans text-sm text-ink bg-surface placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all";
  const errorClass = "font-sans text-xs text-red-500 mt-1";
  const labelClass = "block font-sans text-xs uppercase tracking-wider text-muted mb-2 font-medium";

  if (status === "success") {
    return (
      <div className="card p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-primary mb-2">Message Sent! 💌</h3>
        <p className="font-sans text-muted">
          Zee will get back to you within 24–48 hours. In the meantime, feel free to book directly online!
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-sans text-sm text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <h2 className="font-serif text-2xl text-primary mb-6">Send a Message</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              className={inputClass}
              {...register("name")}
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="(555) 000-0000"
              autoComplete="tel"
              className={inputClass}
              {...register("phone")}
            />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            className={inputClass}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="service">Service You're Interested In</label>
          <select id="service" className={inputClass} {...register("service")}>
            <option value="">Select a service (optional)</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.name}>{s.name} — ${s.price}</option>
            ))}
            <option value="general">General Question</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="message">Message *</label>
          <textarea
            id="message"
            rows={5}
            placeholder="What's on your mind? Ask anything — no question is too small."
            className={`${inputClass} resize-none`}
            {...register("message")}
          />
          {errors.message && <p className={errorClass}>{errors.message.message}</p>}
        </div>

        {status === "error" && (
          <p className="font-sans text-sm text-red-500 bg-red-50 rounded px-4 py-3">
            Something went wrong. Please try again or email us directly at{" "}
            <a href="mailto:hhaesthetics25@gmail.com" className="underline">
              hhaesthetics25@gmail.com
            </a>
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={status === "loading"}
          className="w-full"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
