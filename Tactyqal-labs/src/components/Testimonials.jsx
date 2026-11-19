import React from 'react';
import { testimonials } from '../data/content';

export default function Testimonials() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-surface-container-lowest/50" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-semibold">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold mt-3 text-on-surface">
            What Our Students Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="interactive-spotlight-card p-8 rounded-3xl bg-surface-container/60 backdrop-blur-xl border border-primary/10 hover:border-primary/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-primary text-3xl font-serif leading-none block mb-2">“</span>
                <p className="text-on-surface-variant italic mb-6 text-sm md:text-base leading-relaxed">
                  {item.quote}
                </p>
              </div>
              <div className="pt-4 border-t border-outline/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-on-surface text-base">{item.author}</div>
                  <div className="text-xs text-primary font-medium mt-0.5">{item.role}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm">verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
