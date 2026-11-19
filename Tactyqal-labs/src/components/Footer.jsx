import React from 'react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low py-12 border-t border-[rgba(125,211,252,0.1)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-on-surface-variant text-sm">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded bg-primary text-on-primary font-bold text-xs flex items-center justify-center">
            T
          </span>
          <span>© {CURRENT_YEAR} Tactyqal Labs. All rights reserved.</span>
        </div>
        <div className="flex gap-6 text-xs md:text-sm">
          <a className="hover:text-primary transition-colors" href="#why-us">
            Why Us
          </a>
          <a className="hover:text-primary transition-colors" href="#program">
            Curriculum
          </a>
          <a className="hover:text-primary transition-colors" href="#pricing">
            Pricing
          </a>
          <a className="hover:text-primary transition-colors" href="#contact">
            Contact
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
