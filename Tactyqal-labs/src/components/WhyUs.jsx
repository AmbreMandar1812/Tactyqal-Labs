import React from 'react';
import { whyUsFeatures } from '../data/content';

export default function WhyUs() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-surface-container-lowest/50" id="why-us">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-semibold">
            Why Us
          </span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold mt-3 text-on-surface">
            Why Parents Choose Tactyqal Labs
          </h2>
        </div>

        {/* Hero Mentor Showcase Card */}
        <div className="interactive-spotlight-card mb-16 rounded-3xl bg-surface-container/60 backdrop-blur-xl border border-primary/15 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 md:p-10 shadow-[0_0_30px_rgba(125,211,252,0.1)]">
          <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 border border-primary/10">
            <img
              alt="Friendly expert mentor coaching an ambitious teenage student"
              className="w-full h-full object-cover"
              src="/images/mentor-coaching.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,14,33,0.7)] via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-on-surface font-semibold bg-surface-container/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-primary/20">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                1:1 Live Interactive Sessions
              </span>
              <span className="text-primary font-mono">Weekly Milestones</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/40 border border-primary/20 text-primary text-xs font-semibold w-max">
              <span className="material-symbols-outlined text-sm">school</span>
              Expert Mentorship Model
            </div>
            <h3 className="text-2xl md:text-3xl font-headline font-bold text-on-surface leading-tight">
              Personalized Guidance from Industry Veterans
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Unlike generic cohort courses or pre-recorded tutorials, every Tactyqal student pairs one-on-one with a dedicated mentor. We guide your teen through hands-on technical architecture, real-world deployment, and college portfolio strategy.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-container-high/80 border border-outline/10">
                <div className="text-xl font-bold text-primary font-headline">100%</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Dedicated Attention</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-high/80 border border-outline/10">
                <div className="text-xl font-bold text-primary font-headline">Zero</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Prior Coding Needed</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUsFeatures.map((feat, i) => (
            <div
              key={i}
              className="interactive-spotlight-card p-8 rounded-3xl bg-surface-container/60 backdrop-blur-xl border border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-container/40 flex items-center justify-center text-primary mb-6 shadow-sm">
                <span className="material-symbols-outlined text-2xl fill-current">
                  {feat.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                {feat.title}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
