export const BUSINESS = {
  name: "Her Highness Aesthetics",
  tagline: "Wake Up Ready.",
  description:
    "Premium soft ombré brows and classic lash extensions in Dallas, TX. Certified artist Zee helps you feel confident, beautiful, and effortlessly put together.",
  phone: "(346) 901-4161",
  phoneHref: "tel:+13469014161",
  email: "hhaesthetics25@gmail.com",
  city: "Dallas, TX",
  zip: "75235",
  instagram: "https://www.instagram.com/herhighness__aesthetics/",
  instagramHandle: "@herhighness__aesthetics",
  tiktok: "https://www.tiktok.com/@herhighness.aesth",
  tiktokHandle: "@herhighness.aesth",
  bookingUrl: "/book",
};

export const HOURS = [
  { day: "Monday", open: "10:00 AM", close: "7:30 PM", dayNum: 1 },
  { day: "Tuesday", open: null, close: null, dayNum: 2 },
  { day: "Wednesday", open: null, close: null, dayNum: 3 },
  { day: "Thursday", open: null, close: null, dayNum: 4 },
  { day: "Friday", open: null, close: null, dayNum: 5 },
  { day: "Saturday", open: "9:30 AM", close: "7:30 PM", dayNum: 6 },
  { day: "Sunday", open: "2:00 PM", close: "7:30 PM", dayNum: 0 },
];

// Day numbers where business is open (0=Sunday, 1=Monday, 6=Saturday)
export const OPEN_DAYS = [0, 1, 6];

export const BUSINESS_HOURS_MAP: Record<
  number,
  { open: string; close: string }
> = {
  1: { open: "10:00", close: "19:30" }, // Monday
  6: { open: "09:30", close: "19:30" }, // Saturday
  0: { open: "14:00", close: "19:30" }, // Sunday
};

export const SERVICES = [
  {
    id: "soft-ombre-brows",
    name: "Soft Ombré Brows",
    shortName: "Ombré Brows",
    price: 300,
    deposit: 50,
    durationMinutes: 180,
    tagline: "Wake up with perfect brows. Every single day.",
    description:
      "A permanent brow tattoo with a soft, powder-shaded finish that creates a gradient effect — lighter at the front, naturally darker toward the tail. Suitable for all skin types. Results last 2–3 years with proper care. Brow cleanup included.",
    whatToExpect: [
      "Consultation and brow mapping (30 min)",
      "Color selection matched to your undertones",
      "Numbing cream applied for comfort",
      "Tattooing with specialized PMU machine (90 min)",
      "Final review and aftercare walkthrough",
    ],
    prepInstructions: [
      "Arrive with clean, makeup-free brows and face",
      "Avoid caffeine 24 hours before your appointment",
      "Do not take blood thinners (aspirin, ibuprofen) for 24 hours",
      "Avoid alcohol 24 hours before",
      "Do not work out the morning of your appointment",
    ],
    aftercare: [
      "Keep brows dry for 7 days — no sweating, swimming, or steam",
      "Apply aftercare balm 3–4 times per day for 7 days",
      "Do NOT pick or scratch healing skin",
      "Avoid direct sun exposure for 2 weeks",
      "Touch-up is recommended at 7–9 weeks",
    ],
    badge: "Most Popular",
    requiresPhoto: true,
    photoInstructions:
      "Please upload a photo of your full face with bare, unmade brows so Zee can plan your perfect shape.",
    healing: "7–14 day healing period with light scabbing",
    note: null,
  },
  {
    id: "classic-lashes",
    name: "Classic Lash Extensions",
    shortName: "Classic Lashes",
    price: 65,
    deposit: 20,
    durationMinutes: 120,
    tagline: "Natural, gorgeous lashes customized to you.",
    description:
      "One-to-one lash extension application designed to enhance your natural lashes with soft length and elegant definition. Customizable curl, length, and thickness to match your natural lash capacity. Perfect for first-time clients.",
    whatToExpect: [
      "Lash health assessment and style consultation",
      "Under-eye pads placed for comfort",
      "Individual extensions applied to each natural lash",
      "Final styling and curl check",
    ],
    prepInstructions: [
      "Arrive with clean, mascara-free lashes",
      "Remove all eye makeup and contact lenses before appointment",
      "Avoid curling your lashes the day before",
      "Do not use oil-based skincare near eyes",
    ],
    aftercare: [
      "Keep lashes dry for 24 hours after application",
      "Cleanse lashes daily with a lash-safe cleanser",
      "Brush through with a spoolie every morning",
      "Avoid oil-based products near the lash line",
      "Do not pull or rub your lashes",
    ],
    badge: null,
    requiresPhoto: false,
    photoInstructions: null,
    healing: "No downtime — immediate results",
    note: null,
  },
  {
    id: "brow-touch-up",
    name: "Brow Touch-Up",
    shortName: "Touch-Up",
    price: 100,
    deposit: 25,
    durationMinutes: 90,
    tagline: "Perfect your results at the 7–9 week mark.",
    description:
      "Essential follow-up appointment to perfect your ombré brow results — refining shape, correcting any areas that healed lighter, and locking in your ideal color. This is the step that makes your brows truly perfect.",
    whatToExpect: [
      "Review of healed results",
      "Color and shape assessment",
      "Touch-up pigment work on any lighter areas",
      "Final shape refinement",
    ],
    prepInstructions: [
      "Must be scheduled 7–9 weeks after your original appointment",
      "Arrive with clean, makeup-free brows",
      "Avoid caffeine 24 hours before",
    ],
    aftercare: [
      "Same aftercare as your original appointment",
      "Keep brows dry for 7 days",
      "Apply aftercare balm as directed",
    ],
    badge: null,
    requiresPhoto: false,
    photoInstructions: null,
    healing: "7–14 day healing period",
    note: "Must be 7–9 weeks after your original Her Highness brow appointment. Appointments booked later than 9 weeks will be charged as a new service.",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Destiny R.",
    service: "Soft Ombré Brows",
    rating: 5,
    text: "Zee is absolutely incredible. My brows look exactly how I've always wanted them — full, soft, and so natural. I literally wake up and feel put together without doing anything. Best investment I've ever made.",
    date: "January 2025",
  },
  {
    id: 2,
    name: "Aaliyah M.",
    service: "Classic Lash Extensions",
    rating: 5,
    text: "She really takes her time and makes sure everything is perfect. My lashes are so light and comfortable — I forget they're extensions. The studio is clean and cozy and Zee's energy makes you feel so welcome.",
    date: "December 2024",
  },
  {
    id: 3,
    name: "Jasmine T.",
    service: "Soft Ombré Brows",
    rating: 5,
    text: "I was nervous about permanent makeup but Zee walked me through everything and made me feel so comfortable. My brows healed beautifully. I get compliments constantly. 10/10 would recommend to everyone.",
    date: "November 2024",
  },
  {
    id: 4,
    name: "Morgan K.",
    service: "Brow Touch-Up",
    rating: 5,
    text: "The touch-up made such a difference! Zee really perfected the shape and color. She noticed details I didn't even catch. Her attention to detail is unmatched — you can tell she genuinely cares about the results.",
    date: "October 2024",
  },
];

export const FAQ_ITEMS = [
  {
    category: "Booking & Policies",
    questions: [
      {
        q: "How do I book an appointment?",
        a: "You can book directly on this website by clicking any \"Book Now\" button. You'll choose your service, pick a date and time, fill in your info, and pay a small deposit to secure your spot. The remaining balance is due at your appointment.",
      },
      {
        q: "Is the deposit refundable?",
        a: "Deposits are non-refundable but fully transferable. If you need to reschedule, contact us at least 48 hours before your appointment and your deposit will be applied to your new booking.",
      },
      {
        q: "What happens if I'm late?",
        a: "We allow a 10-minute grace period. If you're more than 10 minutes late, we may need to reschedule your appointment and your deposit may be forfeited. Please contact us as soon as you know you'll be late.",
      },
      {
        q: "Do you accept walk-ins?",
        a: "We are appointment-only to ensure every client gets Zee's full attention and the best possible results. Book online — it only takes a few minutes!",
      },
    ],
  },
  {
    category: "Soft Ombré Brows",
    questions: [
      {
        q: "Does the ombré brow procedure hurt?",
        a: "Most clients report minimal discomfort. We apply a topical numbing cream before and during the procedure to keep you comfortable. Many clients say it feels like light scratching or vibration.",
      },
      {
        q: "How long do ombré brows last?",
        a: "Ombré powder brows typically last 2–3 years depending on your skin type, lifestyle, and sun exposure. Oilier skin tends to fade faster. A touch-up at 7–9 weeks after your initial appointment is strongly recommended to perfect the results.",
      },
      {
        q: "Are ombré brows good for all skin types?",
        a: "Yes! Ombré powder brows are suitable for all skin types, including oily skin. They actually tend to retain color better on oily skin than microblading.",
      },
      {
        q: "Why do I need to submit a photo when booking brows?",
        a: "Zee reviews your natural brow shape, fullness, and facial structure before your appointment so she can pre-plan your ideal brow design. This ensures your appointment goes smoothly and results are tailored to you.",
      },
    ],
  },
  {
    category: "Lash Extensions",
    questions: [
      {
        q: "How long do classic lash extensions last?",
        a: "Lash extensions naturally shed with your natural lash cycle, which is every 6–8 weeks. Most clients come in for a fill every 3–4 weeks to keep lashes looking full. Proper aftercare significantly extends wear time.",
      },
      {
        q: "Can I wear mascara with lash extensions?",
        a: "You won't need mascara! But if you do wear it, use only water-based mascara on the tips only — never the base. Avoid oil-based or waterproof mascaras as they break down the lash adhesive.",
      },
    ],
  },
];

export const SOCIAL_PROOF_STATS = [
  { value: "100+", label: "Happy Clients" },
  { value: "5★", label: "Average Rating" },
  { value: "2+ yrs", label: "Brow Longevity" },
  { value: "Dallas", label: "Based In, TX" },
];
