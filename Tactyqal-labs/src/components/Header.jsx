import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Success Stories', href: '#success-stories' },
  { label: 'Program', href: '#program' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Tools', href: '#tools' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' }
];

export default function Header({ onOpenConsultation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollActiveSection, setScrollActiveSection] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isBlogPage = location.pathname.startsWith('/blog');

  // Derive active section cleanly without setState cascading renders
  const activeSection = isBlogPage ? 'blog' : scrollActiveSection;

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const link of NAV_LINKS) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setScrollActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const getTargetUrl = (href) => {
    if (isHomePage) {
      return href;
    }
    return `/${href}`;
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-[16px] border-b border-[rgba(125,211,252,0.15)] bg-surface/80 transition-all">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold shadow-[0_0_15px_rgba(125,211,252,0.4)] group-hover:scale-105 transition-transform">
            T
          </span>
          <span className="text-xl font-headline font-bold tracking-tight uppercase text-primary">
            Tactyqal Labs
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            const targetUrl = getTargetUrl(link.href);

            return (
              <a
                key={link.href}
                href={targetUrl}
                className={`text-sm transition-colors py-1 px-2.5 rounded-lg font-medium ${
                  isActive
                    ? 'text-primary bg-primary-container/20 font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm shadow-[0_0_30px_rgba(125,211,252,0.25)] hover:shadow-[0_0_35px_rgba(125,211,252,0.4)] hover:opacity-95 transition-all cursor-pointer"
          >
            Book Free Consultation
          </button>
          <img
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border border-primary/30 shadow-sm"
            src="/images/profile-avatar.png"
          />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface border border-outline/20"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface/95 backdrop-blur-2xl border-b border-outline/20 px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((link) => {
            const targetUrl = getTargetUrl(link.href);
            return (
              <a
                key={link.href}
                href={targetUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-on-surface hover:text-primary font-medium py-2 px-3 rounded-lg hover:bg-surface-container transition-all"
              >
                {link.label}
              </a>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full mt-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md text-center"
          >
            Book Free Consultation
          </button>
        </div>
      )}
    </header>
  );
}
