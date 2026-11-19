import React, { useState, useEffect } from 'react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    studentGrade: 'Grade 9',
    interestArea: 'AI & Automation'
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-inverse-surface/60 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-surface rounded-3xl border border-primary/20 shadow-2xl p-6 md:p-8 transform transition-transform duration-300 animate-in zoom-in-95">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/30 text-primary text-xs font-semibold mb-3">
              <span className="material-symbols-outlined text-xs">calendar_month</span>
              1:1 Admissions Call
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface">
              Book Free Parent Consultation
            </h3>
            <p className="text-sm text-on-surface-variant mt-1 mb-6">
              Connect with an admissions advisor to discuss your teen's goals, interests, and how they can build their own app.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container/60 border border-outline/20 text-on-surface text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container/60 border border-outline/20 text-on-surface text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container/60 border border-outline/20 text-on-surface text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Student Grade
                  </label>
                  <select
                    value={formData.studentGrade}
                    onChange={(e) => setFormData({ ...formData, studentGrade: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container/60 border border-outline/20 text-on-surface text-sm focus:outline-none focus:border-primary"
                  >
                    <option>Grade 7</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Target App Area
                  </label>
                  <select
                    value={formData.interestArea}
                    onChange={(e) => setFormData({ ...formData, interestArea: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container/60 border border-outline/20 text-on-surface text-sm focus:outline-none focus:border-primary"
                  >
                    <option>AI &amp; Automation</option>
                    <option>Social Good &amp; Climate</option>
                    <option>eCommerce &amp; Fashion</option>
                    <option>EdTech &amp; Learning</option>
                    <option>Media, Audio &amp; Gaming</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-[0_0_20px_rgba(125,211,252,0.3)] hover:opacity-95 transition-all text-center"
              >
                Confirm Free Consultation Slot →
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface">
              Consultation Scheduled!
            </h3>
            <p className="text-sm text-on-surface-variant mt-2 max-w-sm mx-auto">
              Thank you, {formData.parentName || 'Parent'}. Our lead mentor will reach out via WhatsApp &amp; Email within 24 hours to confirm your calendar slot.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-surface-container border border-outline/15 text-xs text-on-surface text-left">
              <div className="font-semibold text-primary mb-1">Next Steps:</div>
              <div>• We will send a brief student interest questionnaire.</div>
              <div>• 45-minute live screen share with product roadmap.</div>
              <div>• Custom portfolio &amp; college admissions strategy plan.</div>
            </div>
            <button
              onClick={handleClose}
              className="mt-6 px-8 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
