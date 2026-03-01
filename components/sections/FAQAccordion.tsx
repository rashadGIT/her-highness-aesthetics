"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

interface FAQItem {
  q: string;
  a: string;
}

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-serif text-lg font-medium pr-4 transition-colors duration-200 ${
            isOpen ? "text-accent" : "text-primary group-hover:text-accent"
          }`}
        >
          {item.q}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 text-accent transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-sans text-muted leading-relaxed pr-8">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FAQAccordionProps {
  limit?: number; // how many categories to show
}

export function FAQAccordion({ limit }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const categories = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS;

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="section bg-bg" id="faq">
      <div className="container max-w-3xl mx-auto">
        <SectionHeading
          eyebrow="Got Questions"
          title="FAQ"
          subtitle="Everything you need to know before your appointment. Don't see your question? Just reach out — Zee's happy to help."
        />

        <div className="space-y-0">
          {categories.map((category, ci) => (
            <FadeIn key={ci} delay={ci * 0.05}>
              <div className="mb-8">
                <h3 className="font-sans text-xs uppercase tracking-widest text-accent mb-4 font-medium">
                  {category.category}
                </h3>
                <div className="bg-surface rounded-card shadow-card px-6">
                  {category.questions.map((item, qi) => {
                    const key = `${ci}-${qi}`;
                    return (
                      <AccordionItem
                        key={key}
                        item={item}
                        index={qi}
                        isOpen={!!openItems[key]}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
