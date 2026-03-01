import { BUSINESS_HOURS_MAP, OPEN_DAYS } from "./constants";

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}

export function formatCurrency(dollars: number): string {
  return `$${dollars.toLocaleString()}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00"); // avoid timezone issues
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `${hours} hr`;
  return `${hours} hr ${remaining} min`;
}

export function isBusinessOpen(dayNum: number): boolean {
  return OPEN_DAYS.includes(dayNum);
}

export function generateTimeSlots(
  dayNum: number,
  durationMinutes: number,
  bookedTimes: string[]
): string[] {
  const hours = BUSINESS_HOURS_MAP[dayNum];
  if (!hours) return [];

  const slots: string[] = [];
  const [openHour, openMin] = hours.open.split(":").map(Number);
  const [closeHour, closeMin] = hours.close.split(":").map(Number);

  const openTotal = openHour * 60 + openMin;
  const closeTotal = closeHour * 60 + closeMin;
  const buffer = 15; // 15-min buffer between appointments

  let current = openTotal;
  while (current + durationMinutes + buffer <= closeTotal) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    const timeStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

    // Check if this slot conflicts with a booked slot
    const conflicts = bookedTimes.some((booked) => {
      const [bh, bm] = booked.split(":").map(Number);
      const bookedStart = bh * 60 + bm;
      // A booked slot uses [bookedStart, bookedStart + durationMinutes + buffer)
      // Our slot starts at current and ends at current + durationMinutes
      const slotEnd = current + durationMinutes;
      const bookedEnd = bookedStart + durationMinutes + buffer;
      return current < bookedEnd && slotEnd > bookedStart;
    });

    if (!conflicts) {
      slots.push(timeStr);
    }

    current += 30; // offer slots every 30 minutes
  }

  return slots;
}

export function addMinutesToTime(timeStr: string, minutes: number): string {
  const [h, m] = timeStr.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const newH = Math.floor(total / 60);
  const newM = total % 60;
  return `${newH.toString().padStart(2, "0")}:${newM.toString().padStart(2, "0")}`;
}

export function getGoogleCalendarUrl(booking: {
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  durationMinutes: number;
}): string {
  const start = new Date(`${booking.appointmentDate}T${booking.appointmentTime}:00`);
  const end = new Date(start.getTime() + booking.durationMinutes * 60 * 1000);

  const format = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Her Highness Aesthetics — ${booking.serviceName}`,
    dates: `${format(start)}/${format(end)}`,
    details: `Your appointment with Zee at Her Highness Aesthetics.\n\nPrepare: Arrive with clean, makeup-free skin.\n\nQuestions? Email: hhaesthetics25@gmail.com | Call: (346) 901-4161`,
    location: "Dallas, TX 75235",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
