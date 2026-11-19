import React from 'react';
import { projectList } from '../data/projects';

export default function SuccessStories({ onSelectProject }) {
  return (
    <section
      className="py-24 px-6 lg:px-12 bg-surface-container-lowest/50 relative overflow-hidden"
      id="success-stories"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-semibold">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold mt-3 text-on-surface">
            Real Students. Real Apps. Real Success.
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mt-3">
            Click on any project to explore live mockups, student founder journeys, and measurable impact metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="interactive-spotlight-card group cursor-pointer rounded-3xl bg-surface-container/60 backdrop-blur-xl border border-primary/10 hover:border-primary-fixed hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(123,209,250,0.22)] transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
            >
              <div>
                {/* Image Header with Floating Badges */}
                <div className="h-52 bg-cover bg-center overflow-hidden relative">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,14,33,0.7)] via-black/10 to-transparent"></div>

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-surface-container/85 backdrop-blur-xl flex items-center justify-center text-primary shadow-sm border border-outline/10">
                    <span className="material-symbols-outlined fill-current text-lg">
                      {project.icon}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div
                    className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${project.categoryColor}`}
                  >
                    {project.category}
                  </div>

                  {/* Hover Overlay Badge */}
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-surface/90 text-primary text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      Quick Preview &amp; Case Study
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-primary bg-primary-container/30 px-2 py-0.5 rounded">
                      {project.buildDuration}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Footer Metric Bar */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs text-primary font-semibold border-t border-outline/10 mx-6">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${project.dotColor}`}></span>
                  {project.impact}
                </span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
