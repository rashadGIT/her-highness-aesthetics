import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
  service: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const bookingClientInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid phone number"),
  notes: z.string().max(500, "Notes must be under 500 characters").optional(),
  photoKey: z.string().optional(), // S3 key for brow photo
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the booking policy",
  }),
});

export type BookingClientInfoData = z.infer<typeof bookingClientInfoSchema>;

export const createBookingSchema = z.object({
  serviceId: z.string(),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  appointmentTime: z.string().regex(/^\d{2}:\d{2}$/),
  clientInfo: bookingClientInfoSchema,
  stripePaymentIntentId: z.string(),
});

export type CreateBookingData = z.infer<typeof createBookingSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
