import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  const textAlign = align === "center" ? "text-center" : "text-left";
  const titleColor = dark ? "text-white" : "text-primary";
  const subtitleColor = dark ? "text-white/70" : "text-muted";
  const eyebrowColor = "text-accent";

  return (
    <div className={cn("mb-12 md:mb-16", textAlign, className)}>
      {eyebrow && (
        <FadeIn>
          <p className={cn("label mb-3", eyebrowColor)}>{eyebrow}</p>
        </FadeIn>
      )}
      <FadeIn delay={0.05}>
        <h2
          className={cn(
            "font-serif text-display-md md:text-display-lg font-semibold",
            titleColor
          )}
        >
          {title}
        </h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.1}>
          <p
            className={cn(
              "mt-4 font-sans text-base md:text-lg max-w-2xl leading-relaxed",
              subtitleColor,
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
