const STEPS = [
  "Service",
  "Date",
  "Time",
  "Your Info",
  "Review",
  "Payment",
];

interface BookingProgressProps {
  currentStep: number;
}

export function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="mb-8">
      {/* Mobile: simple text indicator */}
      <div className="md:hidden flex items-center justify-between mb-2">
        <span className="font-sans text-sm font-medium text-primary">
          Step {currentStep + 1} of {STEPS.length}
        </span>
        <span className="font-sans text-sm text-muted">{STEPS[currentStep]}</span>
      </div>
      <div className="w-full bg-stone-200 rounded-full h-1.5">
        <div
          className="bg-accent h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Desktop: step labels */}
      <div className="hidden md:flex justify-between mt-3">
        {STEPS.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans font-semibold mb-1 transition-all duration-300 ${
                i < currentStep
                  ? "bg-success text-white"
                  : i === currentStep
                  ? "bg-accent text-white"
                  : "bg-stone-200 text-muted"
              }`}
            >
              {i < currentStep ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`font-sans text-xs ${
                i === currentStep ? "text-primary font-medium" : "text-muted"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
