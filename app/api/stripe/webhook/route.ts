import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { updateBookingPayment, getBookingById } from "@/lib/dynamo";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { bookingId } = paymentIntent.metadata;

    if (bookingId) {
      await updateBookingPayment(bookingId, "succeeded", "confirmed");
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { bookingId } = paymentIntent.metadata;

    if (bookingId) {
      await updateBookingPayment(bookingId, "failed", "pending_payment");
    }
  }

  return NextResponse.json({ received: true });
}
