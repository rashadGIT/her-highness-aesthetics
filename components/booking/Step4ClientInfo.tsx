"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingClientInfoSchema, BookingClientInfoData } from "@/lib/validators";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface Step4Props {
  serviceId: string;
  requiresPhoto: boolean;
  defaultValues?: Partial<BookingClientInfoData>;
  onComplete: (data: BookingClientInfoData) => void;
}

export function Step4ClientInfo({
  serviceId,
  requiresPhoto,
  defaultValues,
  onComplete,
}: Step4Props) {
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoKey, setPhotoKey] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingClientInfoData>({
    resolver: zodResolver(bookingClientInfoSchema),
    defaultValues: { ...defaultValues, agreeToTerms: false },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      // Get pre-signed URL
      const res = await fetch("/api/upload/photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });
      const { presignedUrl, key } = await res.json();

      // Upload to S3
      await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      setPhotoKey(key);
      setPhotoName(file.name);
      setValue("photoKey", key);
    } catch {
      alert("Photo upload failed. Please try again.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-btn border border-stone-200 font-sans text-sm text-ink bg-surface placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all";
  const errorClass = "font-sans text-xs text-red-500 mt-1";
  const labelClass = "block font-sans text-xs uppercase tracking-wider text-muted mb-2 font-medium";

  return (
    <div>
      <h2 className="font-serif text-2xl text-primary mb-2">Your Information</h2>
      <p className="font-sans text-sm text-muted mb-6">
        We'll use this to send your booking confirmation and appointment reminder.
      </p>

      <form id="client-info-form" onSubmit={handleSubmit(onComplete)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              className={inputClass}
              {...register("firstName")}
            />
            {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="lastName">Last Name *</label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              className={inputClass}
              {...register("lastName")}
            />
            {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            className={inputClass}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 000-0000"
            className={inputClass}
            {...register("phone")}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="notes">Special Notes (optional)</label>
          <textarea
            id="notes"
            rows={3}
            placeholder="Any questions, concerns, or preferences Zee should know about?"
            className={`${inputClass} resize-none`}
            {...register("notes")}
          />
        </div>

        {/* Brow photo upload */}
        {requiresPhoto && (
          <div className="p-5 bg-blush/20 border border-blush/40 rounded-card">
            <label className={`${labelClass} text-primary`}>
              Brow Photo Required *
            </label>
            <p className="font-sans text-xs text-muted mb-3">
              Please upload a clear photo of your full face with bare, unmade brows. This helps Zee plan your perfect shape before your appointment.
            </p>

            {photoKey ? (
              <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/30 rounded-btn">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="font-sans text-sm font-medium text-primary">{photoName}</p>
                  <p className="font-sans text-xs text-muted">Photo uploaded successfully</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setPhotoKey(null); setPhotoName(null); setValue("photoKey", undefined); }}
                  className="ml-auto text-xs text-muted hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-blush rounded-btn cursor-pointer hover:border-accent transition-colors">
                {uploadingPhoto ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner className="w-5 h-5 text-accent" />
                    <span className="font-sans text-sm text-muted">Uploading...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span className="font-sans text-sm text-muted">Upload photo</span>
                    <span className="font-sans text-xs text-muted/60">JPEG, PNG, HEIC up to 10MB</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  className="hidden"
                  onChange={handlePhotoUpload}
                  disabled={uploadingPhoto}
                />
              </label>
            )}
          </div>
        )}

        {/* Terms */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-stone-300 text-accent focus:ring-accent"
              {...register("agreeToTerms")}
            />
            <span className="font-sans text-sm text-muted leading-relaxed">
              I understand that my <strong className="text-primary">deposit is non-refundable</strong> but fully transferable if I reschedule at least 48 hours in advance. Appointments cancelled with less than 48 hours notice forfeit the deposit.
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className={`${errorClass} ml-7`}>{errors.agreeToTerms.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
