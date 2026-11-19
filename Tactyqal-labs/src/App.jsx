import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SuccessStories from './components/SuccessStories';
import Program from './components/Program';
import WhyUs from './components/WhyUs';
import Tools from './components/Tools';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ConsultationModal from './components/ConsultationModal';
import BlogPostPage from './pages/BlogPostPage';
import { projectsData } from './data/projects';
import { useCursorReactive } from './hooks/useCursorReactive';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

function LandingPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Initialize interactive cursor, cards 3D tilt and parallax
  useCursorReactive();

  const handleSelectProject = (projectId) => {
    if (projectsData[projectId]) {
      setSelectedProject(projectsData[projectId]);
    }
  };

  return (
    <>
      {/* Main Navigation Header */}
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Main Page Content */}
      <main className="w-full bg-surface">
        <Hero
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onSelectProject={handleSelectProject}
        />
        <SuccessStories onSelectProject={handleSelectProject} />
        <Program />
        <WhyUs />
        <Tools onOpenConsultation={() => setIsConsultationOpen(true)} />
        <Testimonials />
        <Blog />
        <Pricing onOpenConsultation={() => setIsConsultationOpen(true)} />
        <FAQ />
        <Contact onOpenConsultation={() => setIsConsultationOpen(true)} />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Interactive Case Study / Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnroll={() => setIsConsultationOpen(true)}
      />

      {/* Interactive Free Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-surface font-body text-on-surface relative min-h-screen selection:bg-primary-container selection:text-primary">
        {/* Fluid Ambient Cursor Spotlight Glow Layer */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-30 cursor-spotlight-bg transition-opacity duration-500 opacity-90"
          id="globalCursorGlow"
        ></div>

        {/* Reactive Cursor Follower Dot */}
        <div
          aria-hidden="true"
          className="fixed pointer-events-none z-30 w-8 h-8 rounded-full border border-primary/30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out opacity-0 md:opacity-40"
          id="cursorDot"
        ></div>

        {/* Application Routes */}
        <Routes>
          {/* Main Interactive Landing Page (Stitch Screen 1) */}
          <Route path="/" element={<LandingPage />} />

          {/* Dedicated Blog Post View (Stitch Screen 2 - How to Build a Tech Team) */}
          <Route path="/blog" element={<BlogPostPage />} />
          <Route path="/blog/:idOrSlug" element={<BlogPostPage />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
