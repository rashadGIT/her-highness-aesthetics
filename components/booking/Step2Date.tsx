"use client";

import { useState, useEffect } from "react";
import { OPEN_DAYS } from "@/lib/constants";

interface Step2Props {
  selectedDate: string | null;
  onSelect: (date: string) => void;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function Step2Date({ selectedDate, onSelect }: Step2Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startOffset = firstDay.getDay(); // 0=Sun

  const days: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(viewYear, viewMonth, d));
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const isAvailable = (date: Date) => {
    if (date < today) return false;
    return OPEN_DAYS.includes(date.getDay());
  };

  const toDateStr = (date: Date) => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-primary mb-2">Choose Your Date</h2>
      <p className="font-sans text-sm text-muted mb-6">
        We're open <strong className="text-primary">Monday, Saturday, and Sunday</strong>. Gray dates are closed or unavailable.
      </p>

      <div className="card p-6">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-stone-100 transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="font-serif text-xl text-primary font-semibold">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-stone-100 transition-colors"
            aria-label="Next month"
          >
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAY_NAMES.map((d) => (
            <div key={d} className="text-center font-sans text-xs text-muted py-1 font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} />;

            const dateStr = toDateStr(date);
            const available = isAvailable(date);
            const isSelected = dateStr === selectedDate;
            const isToday = date.getTime() === today.getTime();

            return (
              <button
                key={dateStr}
                onClick={() => available && onSelect(dateStr)}
                disabled={!available}
                className={`
                  aspect-square flex items-center justify-center rounded-full text-sm font-sans
                  transition-all duration-150
                  ${isSelected
                    ? "bg-accent text-white font-semibold shadow-glow-gold"
                    : available
                    ? "text-primary hover:bg-accent/10 hover:text-accent font-medium cursor-pointer"
                    : "text-stone-300 cursor-not-allowed"
                  }
                  ${isToday && !isSelected ? "ring-2 ring-accent ring-offset-1" : ""}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-4 text-xs font-sans text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-accent" />
            Selected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-stone-200" />
            Unavailable
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-accent" />
            Today
          </span>
        </div>
      </div>
    </div>
  );
}
