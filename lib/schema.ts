export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Her Highness Aesthetics",
    description:
      "Premium soft ombré brows and classic lash extensions in Dallas, TX. Certified artist Zee creates natural, lasting results.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://herhighnessaesthetics.com",
    telephone: "+13469014161",
    email: "hhaesthetics25@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      postalCode: "75235",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.830086,
      longitude: -96.848618,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: "10:00",
        closes: "19:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:30",
        closes: "19:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "14:00",
        closes: "19:30",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    image:
      process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/og/og-default.jpg`
        : "https://herhighnessaesthetics.com/og/og-default.jpg",
    sameAs: [
      "https://www.instagram.com/herhighness__aesthetics/",
      "https://www.tiktok.com/@herhighness.aesth",
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=32.830086,-96.848618`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Soft Ombré Brows",
        description: "Permanent brow tattoo with soft, powder-shaded finish",
        price: "300",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Classic Lash Extensions",
        description: "One-to-one lash extension application",
        price: "65",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Brow Touch-Up",
        description: "Follow-up appointment to perfect ombré brow results",
        price: "100",
        priceCurrency: "USD",
      },
    ],
  };
}
