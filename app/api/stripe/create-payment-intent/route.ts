import { NextRequest, NextResponse } from "next/server";
import { stripe, DEPOSIT_AMOUNTS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { serviceId, customerEmail, customerName } = await req.json();

    if (!serviceId || !DEPOSIT_AMOUNTS[serviceId]) {
      return NextResponse.json({ error: "Invalid service" }, { status: 400 });
    }

    const amount = DEPOSIT_AMOUNTS[serviceId];

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      receipt_email: customerEmail || undefined,
      metadata: {
        serviceId,
        customerName: customerName || "",
        type: "deposit",
      },
      description: `Her Highness Aesthetics — Deposit for ${serviceId}`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount,
    });
  } catch (error) {
    console.error("Stripe payment intent error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
