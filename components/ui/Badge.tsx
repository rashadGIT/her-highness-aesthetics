import { cn } from "@/lib/utils";

type BadgeVariant = "gold" | "blush" | "dark" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  gold: "bg-accent/10 text-accent border border-accent/20",
  blush: "bg-blush/40 text-primary border border-blush",
  dark: "bg-primary text-white border border-primary",
  outline: "bg-transparent text-accent border border-accent",
};

export function Badge({ children, variant = "gold", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-medium uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
