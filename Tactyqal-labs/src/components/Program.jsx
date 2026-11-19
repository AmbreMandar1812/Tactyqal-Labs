import React from 'react';
import { programPhases } from '../data/content';

export default function Program() {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden" id="program">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-semibold">
            Curriculum
          </span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold mt-3 text-on-surface">
            From Idea to Full App in 8 Weeks
          </h2>
        </div>

        {/* 4 Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {programPhases.map((phase, i) => (
            <div
              key={i}
              className="interactive-spotlight-card p-8 rounded-3xl bg-surface-container/60 backdrop-blur-xl border border-primary/10 hover:border-primary/30 relative overflow-hidden transition-all"
            >
              <div className="text-primary font-mono text-sm font-semibold mb-4">
                {phase.week}
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                {phase.title}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        {/* Naval Quote & Mentoring Banner */}
        <div className="interactive-spotlight-card p-8 md:p-14 rounded-3xl bg-surface-container-high/80 backdrop-blur-2xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_40px_rgba(125,211,252,0.12)]">
          <div className="max-w-2xl">
            <blockquote className="text-xl md:text-2xl font-headline italic text-on-surface mb-4 leading-relaxed">
              "Learn to sell. Learn to build. If you can do both, you will be unstoppable."
            </blockquote>
            <div className="text-primary font-semibold text-sm">– Naval Ravikant</div>
          </div>
          <div className="flex flex-col gap-3 p-6 rounded-2xl bg-surface/90 border border-outline/20 min-w-[280px] shadow-sm">
            <div className="flex items-center gap-3 text-on-surface font-semibold text-sm md:text-base">
              <span className="material-symbols-outlined text-primary text-xl">schedule</span>
              Personal 1:1 Live Sessions
            </div>
            <div className="text-xs text-on-surface-variant">1 Hour Each • Dedicated Industry Coach</div>
            <div className="text-xs text-primary font-medium mt-1">
              University admissions, revenue, international grants
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
