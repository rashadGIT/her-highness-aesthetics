"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function AdminAvailabilityPage() {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const blockDate = async () => {
    if (!date) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/availability/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, reason }),
      });
      if (!res.ok) throw new Error();
      setMessage({ text: `${date} has been blocked`, type: "success" });
      setDate("");
      setReason("");
    } catch {
      setMessage({ text: "Failed to block date. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-primary mb-2">Manage Availability</h1>
      <p className="font-sans text-muted mb-8">
        Block specific dates so clients cannot book them. Useful for vacations, personal days, or fully booked days.
      </p>

      <div className="bg-white rounded-card shadow-card p-6 mb-8">
        <h2 className="font-serif text-xl text-primary mb-4">Block a Date</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-sans text-xs uppercase tracking-wider text-muted mb-2">
              Date to Block
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 rounded-btn border border-stone-200 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block font-sans text-xs uppercase tracking-wider text-muted mb-2">
              Reason (optional — internal only)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Vacation, Personal day"
              className="w-full px-4 py-3 rounded-btn border border-stone-200 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {message && (
            <p className={`font-sans text-sm ${message.type === "success" ? "text-success" : "text-red-500"}`}>
              {message.text}
            </p>
          )}

          <Button
            onClick={blockDate}
            disabled={!date}
            loading={loading}
            variant="secondary"
          >
            Block This Date
          </Button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-card p-4">
        <p className="font-sans text-sm text-amber-800">
          <strong>Note:</strong> Blocking a date prevents new bookings only. Existing confirmed bookings on that date are not affected.
        </p>
      </div>
    </div>
  );
}
