"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  return (
    <section className="section bg-neutral-50">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-wider font-medium text-neutral-400 mb-2">
            Faq
          </p>
          <h2 className="title-section">Popular Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "bg-white border border-neutral-300 rounded-md px-6 data-[state=open]:shadow-sm transition-shadow",
                  "border-b border-neutral-300 hover:shadow-sm"
                )}
              >
                <AccordionTrigger className="text-left font-semibold text-neutral-950 hover:no-underline py-4 cursor-pointer [&[data-state=open]>svg]:rotate-180">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-body text-neutral-600 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
