import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose, onEnroll }) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-inverse-surface/60 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-3xl border border-primary/20 shadow-[0_25px_60px_rgba(0,99,130,0.25)] overflow-hidden flex flex-col transform transition-transform duration-300 animate-in zoom-in-95">
        {/* Modal Header Bar */}
        <div className="px-6 py-4 border-b border-outline/10 flex items-center justify-between bg-surface-container/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${project.categoryColor}`}
            >
              {project.category}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              {project.founder}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Media Preview Frame */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-outline/15 bg-black/5 shadow-inner">
            <img
              alt={`${project.title} Preview`}
              className="w-full h-64 md:h-96 object-cover object-top"
              src={project.image}
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface/90 backdrop-blur-md border border-primary/20 text-xs">
              <span className="text-on-surface font-semibold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Built &amp; Deployed via Tactyqal Labs
              </span>
              <span className="text-primary font-bold">{project.impact}</span>
            </div>
          </div>

          {/* Title & Headline */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">
                {project.title}
              </h3>
              <p className="text-sm md:text-base text-on-surface-variant mt-1">
                {project.tagline}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="#pricing"
                onClick={() => {
                  onClose();
                  onEnroll();
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:opacity-90 shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Explore In Mentoring</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-surface-container/60 border border-outline/10">
              <div className="text-xs text-on-surface-variant font-medium">Timeline</div>
              <div className="text-lg font-bold text-primary mt-0.5">{project.metric1}</div>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container/60 border border-outline/10">
              <div className="text-xs text-on-surface-variant font-medium">Outcome</div>
              <div className="text-lg font-bold text-primary mt-0.5">{project.metric2}</div>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container/60 border border-outline/10">
              <div className="text-xs text-on-surface-variant font-medium">Market Reach</div>
              <div className="text-lg font-bold text-primary mt-0.5">{project.metric3}</div>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container/60 border border-outline/10">
              <div className="text-xs text-on-surface-variant font-medium">Mentorship</div>
              <div className="text-lg font-bold text-primary mt-0.5">1:1 Dedicated</div>
            </div>
          </div>

          {/* Tech Stack & Mentorship Takeaway */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-surface-container-high/60 border border-outline/10">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">layers</span>
                Tech Stack Used
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-surface border border-outline/20 text-on-surface"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-primary-container/20 border border-primary/20">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">verified</span>
                Mentorship Outcome
              </div>
              <p className="text-xs md:text-sm text-on-surface leading-relaxed italic">
                "{project.mentorNote}"
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-surface-container/60 border-t border-outline/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-sm font-semibold transition-colors"
          >
            Close Preview
          </button>
          <a
            href="#pricing"
            onClick={() => {
              onClose();
              onEnroll();
            }}
            className="px-6 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold shadow hover:scale-105 transition-transform"
          >
            Build Similar App For Your Kid →
          </a>
        </div>
      </div>
    </div>
  );
}
