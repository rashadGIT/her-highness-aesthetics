import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { getLocalBusinessSchema } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://herhighnessaesthetics.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Her Highness Aesthetics | Soft Ombré Brows & Lashes in Dallas, TX",
    template: "%s | Her Highness Aesthetics",
  },
  description:
    "Book soft ombré powder brows and classic lash extensions in Dallas, TX with certified artist Zee. Natural, lasting results from $65. Open Monday, Saturday & Sunday.",
  keywords: [
    "ombre brows dallas",
    "ombre powder brows dallas tx",
    "permanent makeup dallas",
    "lash extensions dallas tx",
    "soft ombre brows",
    "brow tattoo dallas",
    "lash artist dallas",
    "beauty salon dallas tx",
    "permanent brows dallas",
    "cosmetic tattoo dallas",
    "her highness aesthetics",
    "zee brow artist dallas",
  ],
  authors: [{ name: "Her Highness Aesthetics" }],
  creator: "Her Highness Aesthetics",
  publisher: "Her Highness Aesthetics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Her Highness Aesthetics",
    title: "Her Highness Aesthetics | Soft Ombré Brows & Lashes in Dallas, TX",
    description:
      "Wake up ready. Premium soft ombré brows and lash extensions in Dallas, TX by certified artist Zee.",
    images: [
      {
        url: "/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Her Highness Aesthetics — Soft Ombré Brows & Lashes in Dallas, TX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Her Highness Aesthetics | Soft Ombré Brows & Lashes in Dallas, TX",
    description: "Wake up ready. Premium soft ombré brows and lash extensions in Dallas, TX.",
    images: ["/og/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/icons/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#2D1B2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = getLocalBusinessSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="bg-bg text-ink font-sans">
        <Nav />
        <main>{children}</main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  );
}
