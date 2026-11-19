import React from 'react';

export default function Pricing({ onOpenConsultation }) {
  const inclusions = [
    '8 weeks of 1:1 mentoring',
    'Full-stack app development',
    'Product Hunt launch',
    'Pitch deck creation',
    'Marketing strategy',
    'Ongoing lifetime support'
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-surface-container-lowest/50" id="pricing">
      <div className="max-w-4xl mx-auto">
        <div className="interactive-spotlight-card p-8 md:p-16 rounded-3xl bg-surface-container/80 backdrop-blur-2xl border border-primary/20 relative overflow-hidden shadow-[0_0_50px_rgba(125,211,252,0.1)]">
          {/* Ambient Glow Orb */}
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-primary text-sm uppercase tracking-widest font-semibold">
              Enrollment
            </span>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mt-3 text-on-surface">
              Start Your Teen's Entrepreneurial Journey
            </h2>
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="line-through text-2xl text-on-surface-variant font-medium">₹25,000</span>
              <span className="text-4xl md:text-5xl font-bold text-primary">₹16,000</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 font-medium">
              Limited time offer • Only 15 spots available for this cohort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {inclusions.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-on-surface font-medium">
                <span className="material-symbols-outlined text-primary fill-current">
                  check_circle
                </span>
                {item}
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onOpenConsultation}
              className="inline-block w-full sm:w-auto px-10 py-4 rounded-xl bg-primary text-on-primary font-bold text-base shadow-[0_0_30px_rgba(125,211,252,0.3)] hover:scale-105 transition-all text-center"
            >
              Enroll Now &amp; Book Free Consultation
            </button>
            <p className="text-xs text-on-surface-variant mt-4 font-medium flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-emerald-500">verified_user</span>
              Results guaranteed or 100% money back
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
