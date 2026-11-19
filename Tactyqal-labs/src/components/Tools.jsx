import React, { useState } from 'react';
import { startupTools } from '../data/content';

export default function Tools({ onOpenConsultation }) {
  const [activeTool, setActiveTool] = useState(null);

  const handleToolClick = (tool) => {
    setActiveTool(tool);
  };

  return (
    <section className="py-24 px-6 lg:px-12 relative" id="tools">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-semibold">
            Free Resources
          </span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold mt-3 text-on-surface">
            Startup Ideas 101 &amp; Free Tools
          </h2>
          <p className="text-on-surface-variant mt-3 text-sm md:text-base">
            Explore our startup assessment tools used by 1000+ entrepreneurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {startupTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className="interactive-spotlight-card p-6 rounded-2xl bg-surface-container/60 backdrop-blur-xl border border-primary/10 hover:border-primary/40 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-container/40 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <span className="material-symbols-outlined">{tool.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline/10 flex items-center justify-between text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Launch Tool</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Tool Modal */}
      {activeTool && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveTool(null);
          }}
        >
          <div className="relative w-full max-w-lg bg-surface rounded-3xl border border-primary/20 shadow-2xl p-6 md:p-8 animate-in zoom-in-95">
            <button
              onClick={() => setActiveTool(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-primary-container/40 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-2xl">{activeTool.icon}</span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface">
              {activeTool.title}
            </h3>
            <p className="text-sm text-on-surface-variant mt-2">
              {activeTool.description} This proprietary assessment is part of the Tactyqal Labs founder curriculum.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-surface-container border border-outline/15 space-y-2 text-xs text-on-surface">
              <div className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-primary text-sm">check</span>
                Instant automated feasibility scoring
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-primary text-sm">check</span>
                Tailored for students aged 12–18
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-primary text-sm">check</span>
                Reviewed 1:1 with an industry mentor
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setActiveTool(null);
                  onOpenConsultation();
                }}
                className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow text-center hover:opacity-95 transition-all"
              >
                Access In 1:1 Mentoring →
              </button>
              <button
                onClick={() => setActiveTool(null)}
                className="px-5 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
