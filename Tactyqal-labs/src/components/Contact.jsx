import React from 'react';

export default function Contact({ onOpenConsultation }) {
  return (
    <section className="py-24 px-6 lg:px-12 bg-surface-container-lowest/50" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="interactive-spotlight-card p-8 md:p-16 rounded-3xl bg-surface-container/80 backdrop-blur-2xl border border-primary/20 text-center shadow-[0_0_40px_rgba(125,211,252,0.1)]">
          <span className="text-primary text-sm uppercase tracking-widest font-semibold">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold mt-3 text-on-surface mb-4">
            Ready to Start Your Teen's Success Story?
          </h2>
          <p className="text-on-surface-variant text-sm max-w-xl mx-auto mb-10">
            Reach out to our dedicated team for any inquiries, assistance, or admissions information you need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
            <a
              href="mailto:tactyqal.labs@gmail.com"
              className="p-6 rounded-2xl bg-surface/60 border border-outline/20 hover:border-primary/40 transition-colors block group"
            >
              <span className="material-symbols-outlined text-primary mb-2 group-hover:scale-110 transition-transform">
                mail
              </span>
              <div className="text-xs text-on-surface-variant font-medium">Email</div>
              <div className="font-bold text-sm text-on-surface mt-1 break-all">
                tactyqal.labs@gmail.com
              </div>
            </a>

            <a
              href="tel:+919804772106"
              className="p-6 rounded-2xl bg-surface/60 border border-outline/20 hover:border-primary/40 transition-colors block group"
            >
              <span className="material-symbols-outlined text-primary mb-2 group-hover:scale-110 transition-transform">
                call
              </span>
              <div className="text-xs text-on-surface-variant font-medium">Phone / WhatsApp</div>
              <div className="font-bold text-sm text-on-surface mt-1">
                +91-98047-72106
              </div>
            </a>

            <div className="p-6 rounded-2xl bg-surface/60 border border-outline/20">
              <span className="material-symbols-outlined text-primary mb-2">schedule</span>
              <div className="text-xs text-on-surface-variant font-medium">Hours &amp; Response</div>
              <div className="font-bold text-sm text-on-surface mt-1">
                Mon-Sat (9am-7pm)<br />Within 24 hours
              </div>
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="inline-block px-10 py-4 rounded-xl bg-primary text-on-primary font-bold text-base shadow-[0_0_30px_rgba(125,211,252,0.3)] hover:scale-105 transition-all"
          >
            Book a Free Appointment
          </button>
        </div>
      </div>
    </section>
  );
}
