import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ["bcryptjs"],
  // Amplify Gen 1 SSR Lambda does not inject runtime env vars automatically.
  // Baking these into the server bundle at build time ensures they're available.
  // These values are ONLY in the server-side bundle (lib/dynamo.ts is Node.js-only).
  env: {
    HHA_AWS_ACCESS_KEY_ID: process.env.HHA_AWS_ACCESS_KEY_ID,
    HHA_AWS_SECRET_KEY: process.env.HHA_AWS_SECRET_KEY,
    HHA_AWS_REGION: process.env.HHA_AWS_REGION,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
    DYNAMODB_BOOKINGS_TABLE: process.env.DYNAMODB_BOOKINGS_TABLE,
    DYNAMODB_BLOCKED_DATES_TABLE: process.env.DYNAMODB_BLOCKED_DATES_TABLE,
    SES_FROM_EMAIL: process.env.SES_FROM_EMAIL,
    SES_REPLY_TO: process.env.SES_REPLY_TO,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    S3_UPLOADS_BUCKET: process.env.S3_UPLOADS_BUCKET,
  },
};

export default nextConfig;
