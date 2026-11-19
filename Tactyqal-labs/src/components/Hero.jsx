import React from 'react';
import { projectsData } from '../data/projects';

export default function Hero({ onOpenConsultation, onSelectProject }) {
  const showcaseProjects = [
    projectsData.krishidrishti,
    projectsData.elenor,
    projectsData.onelastchapter
  ];

  return (
    <section className="relative min-h-[920px] flex flex-col justify-center items-center px-6 lg:px-12 pt-28 pb-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] top-10 left-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Cursor Parallax Floating Graphic Elements */}
      <div
        aria-hidden="true"
        className="absolute top-28 left-[10%] w-24 h-24 rounded-full bg-gradient-to-tr from-primary-container/30 to-secondary-fixed/20 blur-xl pointer-events-none transition-transform duration-300 ease-out"
        data-parallax-depth="35"
      ></div>
      <div
        aria-hidden="true"
        className="absolute top-44 right-[12%] w-36 h-36 rounded-full bg-gradient-to-bl from-tertiary-container/30 to-primary/15 blur-2xl pointer-events-none transition-transform duration-300 ease-out"
        data-parallax-depth="-45"
      ></div>
      <div
        aria-hidden="true"
        className="absolute bottom-28 left-[16%] w-16 h-16 rounded-2xl rotate-12 border border-primary/25 bg-surface-container-high/40 backdrop-blur-md pointer-events-none transition-transform duration-300 ease-out hidden md:flex items-center justify-center text-primary shadow-sm"
        data-parallax-depth="25"
      >
        <span className="material-symbols-outlined text-sm">code</span>
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-40 right-[15%] w-20 h-20 rounded-full border border-primary-fixed/30 bg-surface-container/30 backdrop-blur-md pointer-events-none transition-transform duration-300 ease-out hidden md:flex items-center justify-center text-primary shadow-sm"
        data-parallax-depth="-30"
      >
        <span className="material-symbols-outlined text-base">rocket_launch</span>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[5%] w-10 h-10 rounded-lg -rotate-6 border border-tertiary/20 bg-surface-container/40 pointer-events-none transition-transform duration-300 ease-out hidden lg:block"
        data-parallax-depth="50"
      ></div>

      {/* Main Hero Container */}
      <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center gap-6">
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-xl border border-primary/20 text-primary text-xs uppercase tracking-widest font-semibold">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Limited Time Offer • Results Guaranteed
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight text-on-surface leading-tight max-w-4xl">
          Empower Your Kid To Build The Next App That{' '}
          <span className="text-primary bg-clip-text">Impacts Millions</span>, in 8 Weeks
        </h1>

        {/* Highlights Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 text-xs md:text-sm text-on-surface-variant font-medium py-2 max-w-3xl">
          <span className="px-3.5 py-1.5 rounded-full bg-surface-container border border-outline/20">
            1:1 Mentoring
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-surface-container border border-outline/20">
            Idea To Full-Stack App
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-surface-container border border-outline/20">
            No Coding
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-surface-container border border-outline/20">
            Admissions To Best Colleges
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-surface-container border border-outline/20">
            Grants
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-surface-container border border-outline/20">
            Media Coverage
          </span>
        </div>

        {/* Spotlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl my-4">
          <div className="interactive-spotlight-card p-5 rounded-2xl bg-surface-container/60 backdrop-blur-xl border border-primary/15 flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-primary">100+</span>
            <span className="text-sm text-on-surface-variant mt-1 font-medium">Students Mentored</span>
          </div>
          <div className="interactive-spotlight-card p-5 rounded-2xl bg-surface-container/60 backdrop-blur-xl border border-primary/15 flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-primary">Top</span>
            <span className="text-sm text-on-surface-variant mt-1 font-medium">University Admissions</span>
          </div>
          <div className="interactive-spotlight-card p-5 rounded-2xl bg-surface-container/60 backdrop-blur-xl border border-primary/15 flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-primary">₹Thousands</span>
            <span className="text-sm text-on-surface-variant mt-1 font-medium">Of People Impacted</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mt-2">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-on-primary font-bold text-base shadow-[0_0_30px_rgba(125,211,252,0.3)] hover:scale-105 transition-all text-center"
          >
            Book Free Consultation
          </button>
          <a
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface-container-high/80 backdrop-blur-xl border border-primary/20 text-on-surface font-semibold text-base hover:bg-surface-container-highest transition-all text-center"
            href="#success-stories"
          >
            Explore Success Stories
          </a>
        </div>

        {/* Discount Badge */}
        <div className="mt-2 inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-tertiary-container/30 border border-tertiary/30 text-tertiary text-sm">
          <span className="line-through text-on-surface-variant font-medium">₹25,000</span>
          <span className="font-bold text-lg text-tertiary-fixed">₹16,000</span>
          <span className="text-xs uppercase px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-bold">
            Special Pricing
          </span>
        </div>
      </div>

      {/* Student Apps Showcase Teaser Grid */}
      <div className="w-full max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
        {showcaseProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => onSelectProject(proj.id)}
            className="interactive-spotlight-card rounded-2xl overflow-hidden border border-primary/15 bg-surface-container/60 backdrop-blur-xl group cursor-pointer hover:border-primary/40 transition-all"
          >
            <div
              className="h-48 bg-cover bg-center overflow-hidden group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('${proj.image}')` }}
            ></div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">
                {proj.title}
              </h3>
              <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">
                {proj.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
