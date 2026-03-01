import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Booking } from "./dynamo";
import { formatDate, formatTime, formatDuration, getGoogleCalendarUrl } from "./utils";

const ses = new SESClient({ region: process.env.AWS_REGION || "us-east-1" });

const FROM_EMAIL = process.env.SES_FROM_EMAIL || "hhaesthetics25@gmail.com";
const REPLY_TO = process.env.SES_REPLY_TO || "hhaesthetics25@gmail.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hhaesthetics25@gmail.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://herhighnessaesthetics.com";

async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
}) {
  const toList = Array.isArray(to) ? to : [to];
  await ses.send(
    new SendEmailCommand({
      Source: `Her Highness Aesthetics <${FROM_EMAIL}>`,
      Destination: { ToAddresses: toList },
      ReplyToAddresses: [REPLY_TO],
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: {
          Html: { Data: html, Charset: "UTF-8" },
          Text: { Data: text, Charset: "UTF-8" },
        },
      },
    })
  );
}

// ── Shared Email Wrapper ─────────────────────────────────────────
function wrapEmail(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin: 0; padding: 0; background: #F9F5F0; font-family: Georgia, serif; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 20px; }
    .card { background: #FFFFFF; border-radius: 12px; padding: 40px; border: 1px solid #E8E0D8; }
    .header { text-align: center; margin-bottom: 32px; }
    .brand { color: #2D1B2E; font-size: 22px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
    h1 { color: #2D1B2E; font-size: 28px; margin: 0 0 8px; }
    p { color: #1A1A1A; font-size: 16px; line-height: 1.6; margin: 0 0 16px; }
    .detail-row { display: flex; border-bottom: 1px solid #F0EAE4; padding: 12px 0; }
    .detail-label { color: #6B6B6B; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; width: 140px; flex-shrink: 0; padding-top: 2px; }
    .detail-value { color: #1A1A1A; font-size: 15px; font-weight: 500; }
    .cta-btn { display: inline-block; background: #C9A96E; color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 15px; font-weight: 600; margin: 24px 0 8px; letter-spacing: 0.02em; }
    .badge { display: inline-block; background: #F9F5F0; color: #C9A96E; border: 1px solid #C9A96E; padding: 4px 12px; border-radius: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
    .footer { text-align: center; margin-top: 24px; color: #6B6B6B; font-size: 13px; line-height: 1.6; }
    .divider { border: none; border-top: 1px solid #E8E0D8; margin: 24px 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="brand">Her Highness Aesthetics</div>
      </div>
      ${content}
    </div>
    <div class="footer">
      <p>Her Highness Aesthetics | Dallas, TX 75235<br/>
      <a href="tel:+13469014161" style="color:#C9A96E;">(346) 901-4161</a> &nbsp;|&nbsp;
      <a href="mailto:hhaesthetics25@gmail.com" style="color:#C9A96E;">hhaesthetics25@gmail.com</a></p>
      <p><a href="${SITE_URL}" style="color:#C9A96E;">herhighnessaesthetics.com</a></p>
    </div>
  </div>
</body>
</html>`;
}

// ── 1. Booking Confirmation → Client ─────────────────────────────
export async function sendBookingConfirmation(booking: Booking): Promise<void> {
  const calUrl = getGoogleCalendarUrl({
    serviceName: booking.serviceName,
    appointmentDate: booking.appointmentDate,
    appointmentTime: booking.appointmentTime,
    durationMinutes: booking.durationMinutes,
  });

  const html = wrapEmail(`
    <h1>You're Booked! ✨</h1>
    <p>Hey ${booking.clientName.split(" ")[0]}, your appointment with Zee is confirmed. Here are your details:</p>
    <hr class="divider" />
    <div class="detail-row"><span class="detail-label">Service</span><span class="detail-value">${booking.serviceName}</span></div>
    <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${formatDate(booking.appointmentDate)}</span></div>
    <div class="detail-row"><span class="detail-label">Time</span><span class="detail-value">${formatTime(booking.appointmentTime)}</span></div>
    <div class="detail-row"><span class="detail-label">Duration</span><span class="detail-value">${formatDuration(booking.durationMinutes)}</span></div>
    <div class="detail-row"><span class="detail-label">Deposit Paid</span><span class="detail-value">$${booking.depositAmount} (remaining $${booking.servicePrice - booking.depositAmount} due at appointment)</span></div>
    <div class="detail-row"><span class="detail-label">Location</span><span class="detail-value">Dallas, TX 75235 — address sent in your reminder</span></div>
    <hr class="divider" />
    <p><strong>Need to reschedule?</strong> Contact us at least 48 hours before your appointment and your deposit will transfer to your new booking.</p>
    <div style="text-align:center;">
      <a class="cta-btn" href="${calUrl}">Add to Google Calendar</a>
    </div>
    <hr class="divider" />
    <p style="color:#6B6B6B;font-size:14px;">Questions? Reply to this email or text <a href="tel:+13469014161" style="color:#C9A96E;">(346) 901-4161</a>. See you soon! 💕</p>
  `);

  await sendEmail({
    to: booking.clientEmail,
    subject: `Your appointment is confirmed! — ${booking.serviceName} on ${formatDate(booking.appointmentDate)}`,
    html,
    text: `You're booked! ${booking.serviceName} on ${formatDate(booking.appointmentDate)} at ${formatTime(booking.appointmentTime)}. Deposit paid: $${booking.depositAmount}. Questions? Email hhaesthetics25@gmail.com or call (346) 901-4161.`,
  });
}

// ── 2. New Booking Alert → Zee ───────────────────────────────────
export async function sendAdminNewBooking(booking: Booking): Promise<void> {
  const adminUrl = `${SITE_URL}/admin/bookings/${booking.bookingId}`;

  const html = wrapEmail(`
    <h1>New Booking! 🎉</h1>
    <p>You have a new appointment booked on your site.</p>
    <hr class="divider" />
    <div class="detail-row"><span class="detail-label">Client</span><span class="detail-value">${booking.clientName}</span></div>
    <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value"><a href="mailto:${booking.clientEmail}" style="color:#C9A96E;">${booking.clientEmail}</a></span></div>
    <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value"><a href="tel:${booking.clientPhone}" style="color:#C9A96E;">${booking.clientPhone}</a></span></div>
    <div class="detail-row"><span class="detail-label">Service</span><span class="detail-value">${booking.serviceName}</span></div>
    <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${formatDate(booking.appointmentDate)}</span></div>
    <div class="detail-row"><span class="detail-label">Time</span><span class="detail-value">${formatTime(booking.appointmentTime)}</span></div>
    <div class="detail-row"><span class="detail-label">Deposit</span><span class="detail-value">$${booking.depositAmount} paid ✓</span></div>
    ${booking.notes ? `<div class="detail-row"><span class="detail-label">Client Notes</span><span class="detail-value">${booking.notes}</span></div>` : ""}
    <div style="text-align:center; margin-top:24px;">
      <a class="cta-btn" href="${adminUrl}">View in Admin Dashboard</a>
    </div>
  `);

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Booking: ${booking.clientName} — ${booking.serviceName} on ${formatDate(booking.appointmentDate)}`,
    html,
    text: `New booking from ${booking.clientName} for ${booking.serviceName} on ${formatDate(booking.appointmentDate)} at ${formatTime(booking.appointmentTime)}. Deposit: $${booking.depositAmount}. View: ${adminUrl}`,
  });
}

// ── 3. 24-Hour Reminder → Client ─────────────────────────────────
export async function sendReminder24hr(booking: Booking): Promise<void> {
  const html = wrapEmail(`
    <h1>Your appointment is tomorrow! ✨</h1>
    <p>Hey ${booking.clientName.split(" ")[0]}, just a friendly reminder about your upcoming appointment with Zee.</p>
    <hr class="divider" />
    <div class="detail-row"><span class="detail-label">Service</span><span class="detail-value">${booking.serviceName}</span></div>
    <div class="detail-row"><span class="detail-label">Tomorrow</span><span class="detail-value">${formatTime(booking.appointmentTime)}</span></div>
    <div class="detail-row"><span class="detail-label">Duration</span><span class="detail-value">${formatDuration(booking.durationMinutes)}</span></div>
    <hr class="divider" />
    <p><strong>Quick reminders before your appointment:</strong></p>
    <ul style="color:#1A1A1A; font-size:15px; line-height:2;">
      <li>Arrive with clean skin (no makeup, no skincare on treatment area)</li>
      <li>Avoid caffeine and alcohol today</li>
      <li>Don't work out the morning of your appointment</li>
      <li>Bring your ID and your excitement! 🌟</li>
    </ul>
    <p>Need to reschedule? Contact us ASAP — at least 24 hours before your appointment.</p>
    <p style="color:#6B6B6B;font-size:14px;">Questions? Reply here or text <a href="tel:+13469014161" style="color:#C9A96E;">(346) 901-4161</a>. Can't wait to see you! 💕</p>
  `);

  await sendEmail({
    to: booking.clientEmail,
    subject: `Reminder: Your ${booking.serviceName} is tomorrow at ${formatTime(booking.appointmentTime)} 💕`,
    html,
    text: `Hi ${booking.clientName.split(" ")[0]}! Your ${booking.serviceName} appointment is tomorrow at ${formatTime(booking.appointmentTime)}. Remember to arrive with clean skin, avoid caffeine, and don't work out the morning of. Questions? (346) 901-4161`,
  });
}

// ── 4. Cancellation Email → Client ───────────────────────────────
export async function sendCancellationEmail(
  booking: Booking,
  reason?: string
): Promise<void> {
  const html = wrapEmail(`
    <h1>Appointment Cancelled</h1>
    <p>Hey ${booking.clientName.split(" ")[0]}, your appointment has been cancelled.</p>
    <hr class="divider" />
    <div class="detail-row"><span class="detail-label">Service</span><span class="detail-value">${booking.serviceName}</span></div>
    <div class="detail-row"><span class="detail-label">Was Scheduled</span><span class="detail-value">${formatDate(booking.appointmentDate)} at ${formatTime(booking.appointmentTime)}</span></div>
    ${reason ? `<div class="detail-row"><span class="detail-label">Reason</span><span class="detail-value">${reason}</span></div>` : ""}
    <hr class="divider" />
    <p>We'd love to see you again soon! Click below to book a new appointment.</p>
    <div style="text-align:center;">
      <a class="cta-btn" href="${SITE_URL}/book">Book a New Appointment</a>
    </div>
    <p style="color:#6B6B6B;font-size:14px;margin-top:24px;">Questions about your deposit? Reply to this email or call <a href="tel:+13469014161" style="color:#C9A96E;">(346) 901-4161</a>.</p>
  `);

  await sendEmail({
    to: booking.clientEmail,
    subject: `Your appointment has been cancelled — ${booking.serviceName}`,
    html,
    text: `Your ${booking.serviceName} appointment on ${formatDate(booking.appointmentDate)} has been cancelled. Book again at ${SITE_URL}/book. Questions? (346) 901-4161`,
  });
}

// ── 5. Review Request → Client (48hr post-appointment) ───────────
export async function sendReviewRequest(booking: Booking): Promise<void> {
  const googleReviewUrl = "https://g.page/r/herhighnessaesthetics/review"; // update with real URL

  const html = wrapEmail(`
    <h1>How are your ${booking.serviceId === "classic-lashes" ? "lashes" : "brows"} looking? 😍</h1>
    <p>Hey ${booking.clientName.split(" ")[0]}! It's been a couple days since your appointment — we hope you're obsessing over your results!</p>
    <p>If you love your ${booking.serviceId === "classic-lashes" ? "lashes" : "brows"}, it would mean the world to us if you left a quick review. It only takes 60 seconds and helps other women find Zee! ✨</p>
    <div style="text-align:center; margin: 32px 0;">
      <a class="cta-btn" href="${googleReviewUrl}" style="margin-right:12px;">Leave a Google Review ⭐</a>
    </div>
    <hr class="divider" />
    <p><strong>Tag us on Instagram!</strong> Share your results and tag <a href="https://www.instagram.com/herhighness__aesthetics/" style="color:#C9A96E;">@herhighness__aesthetics</a> — we love seeing your glow-ups! 💅</p>
    <hr class="divider" />
    <p><strong>Refer a friend and you BOTH get $20 off</strong> your next service. Just have them mention your name when booking.</p>
    <p style="color:#6B6B6B;font-size:14px;">Thank you for trusting Zee with your beauty — see you next time! 💕</p>
  `);

  await sendEmail({
    to: booking.clientEmail,
    subject: `How are your results looking? Leave us a quick review! ⭐`,
    html,
    text: `Hey ${booking.clientName.split(" ")[0]}! Hope you're loving your results! Would you mind leaving a quick review? It helps so much: ${googleReviewUrl}. Also, tag us on Instagram @herhighness__aesthetics! 💕`,
  });
}

// ── 6. Contact Form Notification → Zee ──────────────────────────
export async function sendContactFormNotification(form: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
}): Promise<void> {
  const html = wrapEmail(`
    <h1>New Contact Form Message</h1>
    <hr class="divider" />
    <div class="detail-row"><span class="detail-label">From</span><span class="detail-value">${form.name}</span></div>
    <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value"><a href="mailto:${form.email}" style="color:#C9A96E;">${form.email}</a></span></div>
    ${form.phone ? `<div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value"><a href="tel:${form.phone}" style="color:#C9A96E;">${form.phone}</a></span></div>` : ""}
    ${form.service ? `<div class="detail-row"><span class="detail-label">Interested In</span><span class="detail-value">${form.service}</span></div>` : ""}
    <div style="margin-top:20px; padding:16px; background:#F9F5F0; border-radius:8px; border-left:3px solid #C9A96E;">
      <p style="margin:0; white-space:pre-wrap;">${form.message}</p>
    </div>
  `);

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New message from ${form.name}${form.service ? ` — interested in ${form.service}` : ""}`,
    html,
    text: `New contact form from ${form.name} (${form.email}): ${form.message}`,
  });
}

// ── 7. Contact Auto-Reply → Sender ───────────────────────────────
export async function sendContactAutoReply(form: {
  name: string;
  email: string;
}): Promise<void> {
  const html = wrapEmail(`
    <h1>We got your message! 💌</h1>
    <p>Hey ${form.name.split(" ")[0]},</p>
    <p>Thank you for reaching out to Her Highness Aesthetics! Zee will be in touch within 24–48 hours.</p>
    <p>In the meantime, you're welcome to browse services or book directly online — no waiting required!</p>
    <div style="text-align:center; margin:24px 0;">
      <a class="cta-btn" href="${SITE_URL}/book">Book an Appointment</a>
    </div>
    <p style="color:#6B6B6B;font-size:14px;">— Zee & the Her Highness Aesthetics team 💕</p>
  `);

  await sendEmail({
    to: form.email,
    subject: "We received your message — Her Highness Aesthetics",
    html,
    text: `Hi ${form.name.split(" ")[0]}, thank you for reaching out! Zee will respond within 24-48 hours. Book online at ${SITE_URL}/book`,
  });
}
