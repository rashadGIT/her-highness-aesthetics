"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookingProgress } from "./BookingProgress";
import { Step1Service } from "./Step1Service";
import { Step2Date } from "./Step2Date";
import { Step3Time } from "./Step3Time";
import { Step4ClientInfo } from "./Step4ClientInfo";
import { Step5Review } from "./Step5Review";
import { Step6Payment } from "./Step6Payment";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";
import { BookingClientInfoData } from "@/lib/validators";

type WizardState = {
  serviceId: string | null;
  date: string | null;
  time: string | null;
  clientInfo: BookingClientInfoData | null;
};

export function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service");

  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    serviceId: preSelectedService || null,
    date: null,
    time: null,
    clientInfo: null,
  });

  // If service pre-selected, skip to step 1
  useEffect(() => {
    if (preSelectedService && SERVICES.find((s) => s.id === preSelectedService)) {
      setState((prev) => ({ ...prev, serviceId: preSelectedService }));
      setStep(1);
    }
  }, [preSelectedService]);

  const service = SERVICES.find((s) => s.id === state.serviceId);

  const canAdvance = () => {
    switch (step) {
      case 0: return !!state.serviceId;
      case 1: return !!state.date;
      case 2: return !!state.time;
      case 3: return false; // form submits itself
      case 4: return true; // review always can advance
      default: return false;
    }
  };

  const handleNext = () => {
    if (step === 3) {
      // Step 3 (client info) submits via form — handled by Step4
      document.getElementById("client-info-form")?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
      return;
    }
    setStep((s) => Math.min(s + 1, 5));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handlePaymentSuccess = (bookingId: string) => {
    router.push(`/booking/${bookingId}`);
  };

  return (
    <div>
      <BookingProgress currentStep={step} />

      <div className="card p-6 md:p-10">
        {step === 0 && (
          <Step1Service
            selectedServiceId={state.serviceId}
            onSelect={(id) => setState((prev) => ({ ...prev, serviceId: id }))}
          />
        )}

        {step === 1 && (
          <Step2Date
            selectedDate={state.date}
            onSelect={(date) => setState((prev) => ({ ...prev, date, time: null }))}
          />
        )}

        {step === 2 && state.serviceId && state.date && (
          <Step3Time
            selectedDate={state.date}
            serviceId={state.serviceId}
            selectedTime={state.time}
            onSelect={(time) => setState((prev) => ({ ...prev, time }))}
          />
        )}

        {step === 3 && service && (
          <Step4ClientInfo
            serviceId={state.serviceId!}
            requiresPhoto={service.requiresPhoto}
            defaultValues={state.clientInfo || undefined}
            onComplete={(data) => {
              setState((prev) => ({ ...prev, clientInfo: data }));
              setStep(4);
            }}
          />
        )}

        {step === 4 && state.serviceId && state.date && state.time && state.clientInfo && (
          <Step5Review
            serviceId={state.serviceId}
            date={state.date}
            time={state.time}
            clientInfo={state.clientInfo}
            onEditStep={setStep}
          />
        )}

        {step === 5 && state.serviceId && state.date && state.time && state.clientInfo && (
          <Step6Payment
            serviceId={state.serviceId}
            date={state.date}
            time={state.time}
            clientInfo={state.clientInfo}
            onSuccess={handlePaymentSuccess}
          />
        )}

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-stone-100">
            {step > 0 ? (
              <Button onClick={handleBack} variant="ghost" className="bg-stone-100 text-primary hover:bg-stone-200 border-0">
                ← Back
              </Button>
            ) : (
              <div />
            )}

            {step < 4 && (
              <Button
                onClick={handleNext}
                variant="primary"
                disabled={!canAdvance()}
              >
                {step === 3 ? "Save & Continue" : "Continue →"}
              </Button>
            )}

            {step === 4 && (
              <Button onClick={() => setStep(5)} variant="primary" size="lg">
                Proceed to Payment →
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
