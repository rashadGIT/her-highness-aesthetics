import { SERVICES } from "@/lib/constants";
import { formatDate, formatTime, formatDuration } from "@/lib/utils";
import { BookingClientInfoData } from "@/lib/validators";

interface Step5Props {
  serviceId: string;
  date: string;
  time: string;
  clientInfo: BookingClientInfoData;
  onEditStep: (step: number) => void;
}

export function Step5Review({ serviceId, date, time, clientInfo, onEditStep }: Step5Props) {
  const service = SERVICES.find((s) => s.id === serviceId)!;

  const rows = [
    {
      label: "Service",
      value: service.name,
      subValue: `$${service.price} total`,
      step: 0,
    },
    {
      label: "Date",
      value: formatDate(date),
      step: 1,
    },
    {
      label: "Time",
      value: formatTime(time),
      subValue: formatDuration(service.durationMinutes),
      step: 2,
    },
    {
      label: "Name",
      value: `${clientInfo.firstName} ${clientInfo.lastName}`,
      step: 3,
    },
    {
      label: "Email",
      value: clientInfo.email,
      step: 3,
    },
    {
      label: "Phone",
      value: clientInfo.phone,
      step: 3,
    },
  ];

  return (
    <div>
      <h2 className="font-serif text-2xl text-primary mb-2">Review Your Booking</h2>
      <p className="font-sans text-sm text-muted mb-6">
        Everything look good? You'll pay the deposit on the next step to confirm your spot.
      </p>

      <div className="card divide-y divide-stone-100">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-6 py-4"
          >
            <div>
              <p className="font-sans text-xs text-muted uppercase tracking-wider">{row.label}</p>
              <p className="font-sans text-sm font-medium text-primary mt-0.5">{row.value}</p>
              {row.subValue && (
                <p className="font-sans text-xs text-muted">{row.subValue}</p>
              )}
            </div>
            <button
              onClick={() => onEditStep(row.step)}
              className="font-sans text-xs text-accent hover:underline"
            >
              Edit
            </button>
          </div>
        ))}

        {clientInfo.notes && (
          <div className="px-6 py-4">
            <p className="font-sans text-xs text-muted uppercase tracking-wider mb-1">Notes</p>
            <p className="font-sans text-sm text-primary">{clientInfo.notes}</p>
          </div>
        )}
      </div>

      {/* Deposit summary */}
      <div className="mt-4 p-5 bg-accent/5 border border-accent/20 rounded-card">
        <div className="flex justify-between items-center mb-2">
          <span className="font-sans text-sm text-muted">Deposit due today</span>
          <span className="font-serif text-2xl text-accent font-semibold">${service.deposit}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-muted">Balance due at appointment</span>
          <span className="font-sans text-sm font-medium text-primary">
            ${service.price - service.deposit}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-accent/20">
          <p className="font-sans text-xs text-muted">
            ✓ Deposit secures your time slot<br />
            ✓ Deposit transfers if rescheduled 48+ hrs in advance<br />
            ✓ Confirmation email sent immediately after payment
          </p>
        </div>
      </div>
    </div>
  );
}
