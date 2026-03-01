import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const DEPOSIT_AMOUNTS: Record<string, number> = {
  "soft-ombre-brows": 5000, // $50.00 in cents
  "classic-lashes": 2000,  // $20.00 in cents
  "brow-touch-up": 2500,   // $25.00 in cents
};
