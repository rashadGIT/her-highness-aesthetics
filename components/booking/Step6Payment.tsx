"use client";

import { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { SERVICES } from "@/lib/constants";
import { BookingClientInfoData } from "@/lib/validators";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Step6Props {
  serviceId: string;
  date: string;
  time: string;
  clientInfo: BookingClientInfoData;
  onSuccess: (bookingId: string) => void;
}

function PaymentForm({
  serviceId,
  date,
  time,
  clientInfo,
  onSuccess,
  paymentIntentId,
}: Step6Props & { paymentIntentId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = SERVICES.find((s) => s.id === serviceId)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    // Confirm payment
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message || "Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      // Create booking record
      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId,
            appointmentDate: date,
            appointmentTime: time,
            clientInfo,
            stripePaymentIntentId: paymentIntentId,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Booking creation failed");
        }

        const { bookingId } = await res.json();
        onSuccess(bookingId);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Payment succeeded but booking creation failed. Please contact us immediately at (346) 901-4161."
        );
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Deposit summary */}
      <div className="p-4 bg-primary/5 rounded-card border border-primary/10">
        <div className="flex justify-between">
          <span className="font-sans text-sm text-muted">Deposit for {service.name}</span>
          <span className="font-sans font-semibold text-primary">${service.deposit}.00</span>
        </div>
        <p className="font-sans text-xs text-muted mt-1">
          Remaining ${service.price - service.deposit} due at your appointment
        </p>
      </div>

      {/* Stripe Payment Element */}
      <div>
        <label className="block font-sans text-xs uppercase tracking-wider text-muted mb-3 font-medium">
          Payment Details
        </label>
        <div className="border border-stone-200 rounded-card p-4">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-card">
          <p className="font-sans text-sm text-red-700">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={!stripe || !elements}
        className="w-full"
      >
        {loading ? "Processing..." : `Pay $${service.deposit} Deposit → Confirm Booking`}
      </Button>

      <p className="font-sans text-xs text-muted text-center">
        🔒 Secured by Stripe. Your card information is never stored on our servers.
      </p>
    </form>
  );
}

export function Step6Payment(props: Step6Props) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = SERVICES.find((s) => s.id === props.serviceId)!;

  useEffect(() => {
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: props.serviceId,
        customerEmail: props.clientInfo.email,
        customerName: `${props.clientInfo.firstName} ${props.clientInfo.lastName}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        } else {
          setError("Failed to initialize payment. Please try again.");
        }
      })
      .catch(() => setError("Failed to connect to payment service. Please try again."))
      .finally(() => setLoading(false));
  }, [props.serviceId, props.clientInfo.email]);

  if (loading) {
    return (
      <div className="flex flex-col items-center py-16 gap-3">
        <LoadingSpinner className="w-10 h-10 text-accent" />
        <p className="font-sans text-sm text-muted">Preparing secure checkout...</p>
      </div>
    );
  }

  if (error || !clientSecret || !paymentIntentId) {
    return (
      <div className="card p-6 text-center">
        <p className="font-sans text-muted mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-primary mb-2">Secure Payment</h2>
      <p className="font-sans text-sm text-muted mb-6">
        Pay your ${service.deposit} deposit to confirm your appointment. The remaining balance is due at your appointment.
      </p>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#C9A96E",
              colorBackground: "#FFFFFF",
              fontFamily: "DM Sans, system-ui, sans-serif",
              borderRadius: "6px",
            },
          },
        }}
      >
        <PaymentForm {...props} paymentIntentId={paymentIntentId} />
      </Elements>
    </div>
  );
}
