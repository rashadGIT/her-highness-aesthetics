"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Booking } from "@/lib/dynamo";
import { Button } from "@/components/ui/Button";

export function BookingActions({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [adminNotes, setAdminNotes] = useState(booking.adminNotes || "");
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const updateStatus = async (status: string, reason?: string) => {
    setLoading(status);
    setMessage(null);
    try {
      const res = await fetch(`/api/bookings/${booking.bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes, reason }),
      });
      if (!res.ok) throw new Error();
      setMessage("Updated successfully");
      router.refresh();
    } catch {
      setMessage("Update failed. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const isActive = booking.status === "confirmed";

  return (
    <div className="bg-white rounded-card shadow-card p-6">
      <h2 className="font-serif text-xl text-primary mb-4">Admin Actions</h2>

      {/* Admin notes */}
      <div className="mb-5">
        <label className="block font-sans text-xs uppercase tracking-wider text-muted mb-2">
          Admin Notes
        </label>
        <textarea
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-btn border border-stone-200 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          placeholder="Internal notes for this booking..."
        />
      </div>

      {message && (
        <p className={`font-sans text-sm mb-4 ${message.includes("failed") ? "text-red-500" : "text-success"}`}>
          {message}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => updateStatus("completed")}
          variant="secondary"
          loading={loading === "completed"}
          disabled={!isActive}
        >
          Mark Completed
        </Button>
        <Button
          onClick={() => updateStatus("no_show")}
          loading={loading === "no_show"}
          disabled={!isActive}
          className="bg-amber-500 hover:bg-amber-600 text-white border-0"
        >
          Mark No-Show
        </Button>
        <Button
          onClick={() => {
            if (confirm("Cancel this booking? A cancellation email will be sent to the client.")) {
              updateStatus("cancelled", "Cancelled by admin");
            }
          }}
          loading={loading === "cancelled"}
          disabled={booking.status === "cancelled"}
          className="bg-red-500 hover:bg-red-600 text-white border-0"
        >
          Cancel Booking
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-stone-100 flex gap-4">
        <a
          href={`tel:${booking.clientPhone}`}
          className="font-sans text-sm text-accent hover:underline"
        >
          📞 Call {booking.clientPhone}
        </a>
        <a
          href={`mailto:${booking.clientEmail}`}
          className="font-sans text-sm text-accent hover:underline"
        >
          ✉ Email {booking.clientEmail}
        </a>
      </div>
    </div>
  );
}
