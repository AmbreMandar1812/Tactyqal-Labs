import React, { useState } from 'react';
import { faqItems } from '../data/content';

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState([0]); // first one open by default

  const toggleIndex = (idx) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  return (
    <section className="py-24 px-6 lg:px-12" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-semibold">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold mt-3 text-on-surface">
            Frequently Asked Questions
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mt-3">
            Everything you need to know about the 8-week teen accelerator program.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => toggleIndex(idx)}
                className="interactive-spotlight-card p-6 rounded-2xl bg-surface-container/60 backdrop-blur-xl border border-primary/10 hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold text-base md:text-lg text-on-surface">
                    {item.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-primary text-on-primary' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">expand_more</span>
                  </div>
                </div>
                {isOpen && (
                  <p className="text-on-surface-variant text-sm mt-3 pt-3 border-t border-outline/10 leading-relaxed animate-in fade-in duration-200">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
