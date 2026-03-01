"use client";

import { useEffect, useState } from "react";
import { formatDate, formatTime } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface Step3Props {
  selectedDate: string;
  serviceId: string;
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export function Step3Time({ selectedDate, serviceId, selectedTime, onSelect }: Step3Props) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/availability?date=${selectedDate}&serviceId=${serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.reason === "closed") {
          setError("We're closed on this date. Please select a different day.");
        } else if (data.reason === "blocked") {
          setError("This date is fully booked. Please select a different day.");
        } else {
          setSlots(data.slots || []);
          if ((data.slots || []).length === 0) {
            setError("No available times for this date. Please try another day.");
          }
        }
      })
      .catch(() => setError("Failed to load available times. Please try again."))
      .finally(() => setLoading(false));
  }, [selectedDate, serviceId]);

  return (
    <div>
      <h2 className="font-serif text-2xl text-primary mb-1">Choose Your Time</h2>
      <p className="font-sans text-sm text-muted mb-6">
        Available times for <strong className="text-primary">{formatDate(selectedDate)}</strong>
      </p>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner className="w-8 h-8 text-accent" />
        </div>
      )}

      {error && !loading && (
        <div className="card p-6 text-center">
          <p className="font-sans text-muted">{error}</p>
        </div>
      )}

      {!loading && !error && slots.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => onSelect(slot)}
              className={`py-3 px-2 rounded-btn border-2 font-sans text-sm font-medium transition-all duration-200 ${
                selectedTime === slot
                  ? "border-accent bg-accent text-white shadow-glow-gold"
                  : "border-stone-200 text-primary hover:border-accent hover:text-accent"
              }`}
            >
              {formatTime(slot)}
            </button>
          ))}
        </div>
      )}

      {!loading && !error && selectedTime && (
        <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded-btn">
          <p className="font-sans text-sm text-primary">
            Selected: <strong>{formatTime(selectedTime)}</strong> on {formatDate(selectedDate)}
          </p>
        </div>
      )}
    </div>
  );
}
