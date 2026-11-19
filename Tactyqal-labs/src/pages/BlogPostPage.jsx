import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import { fetchPost } from '../services/api';
import { useCursorReactive } from '../hooks/useCursorReactive';

const DEFAULT_POST = {
  id: 5,
  title: "How to Build a Tech Team For Your Startup?",
  slug: "building tech team for Startups",
  excerpt: "As an entrepreneur who’s been in the startup trenches, I know firsthand how crucial it is to build an A-team of rockstars. Your tech team is the beating heart of your company—here’s your tactical blueprint to recruit, retain, and scale.",
  content: "As an entrepreneur who’s been in the startup trenches, I know firsthand how crucial it is to build an A-team of rockstars. Your tech team is the beating heart of your company, responsible for breathing life into your vision and creating the products that will drive your success. \n But assembling a high-performing tech squad is no walk in the park. It’s a delicate dance of finding the right talent, fostering a culture of collaboration and innovation, and keeping your team engaged and motivated for the long haul. \n In this blog post, I’ll share my hard-won insights on how to build a tech team that can propel your startup to new heights. We’ll cover everything from identifying the key roles you need to fill, to attracting top talent, cultivating a winning team culture, and keeping your squad fired up and focused on smashing their goals.",
  imageUrl: "/images/blog-hero-startup-team.jpg",
  readTimeMinutes: 6,
  publishedAt: "2020-12-11T10:00:00.000Z",
  author: {
    id: 2,
    name: "Partha Chakraborty",
    bio: "Founder of Tactyqal.com • 17+ Years in VC & Tech Ecosystems",
    avatarUrl: "/images/author-partha-sm.jpg"
  },
  category: {
    id: 1,
    name: "Startup Team Building",
    slug: "technology"
  },
  tags: [
    { id: 1, name: "Startup", slug: "startup" },
    { id: 2, name: "Hiring", slug: "hiring" }
  ],
  related: [
    {
      id: 7,
      title: "10 Essential Tips for Building a Successful Web Application",
      slug: "essential-tips-building-successful-web-application",
      excerpt: "Discover practical strategies for building scalable, secure, and user-friendly web applications using modern development practices.",
      imageUrl: "/images/blog-no-code-ideas.jpg",
      readTimeMinutes: 5,
      category: { name: "Web Development" }
    },
    {
      id: 6,
      title: "The Future of AI in Modern Business",
      slug: "future-of-ai-in-modern-business",
      excerpt: "Explore how artificial intelligence is transforming startup operations, product development, and customer workflows.",
      imageUrl: "/images/blog-toxic-culture.jpg",
      readTimeMinutes: 4,
      category: { name: "AI Strategy" }
    },
    {
      id: 8,
      title: "The Ultimate Guide to Hiring Interns for Your Early Startup",
      slug: "hiring-interns-early-startup",
      excerpt: "How ambitious college engineering interns can fast-track your MVP features while keeping your burn rate lean.",
      imageUrl: "/images/blog-hiring-interns.jpg",
      readTimeMinutes: 5,
      category: { name: "Talent Acquisition" }
    }
  ]
};

const QUIZ_QUESTIONS = [
  "Do you have a clear understanding of the key tech roles your startup needs to fill?",
  "Have you developed a streamlined and efficient hiring process for attracting top tech talent?",
  "Do you have a plan in place for cultivating a winning team culture that promotes continuous learning?",
  "Are you prepared to offer competitive compensation and clear equity growth opportunities?",
  "Do you have strategies in place for fostering work-life balance and prioritizing team well-being?"
];

export default function BlogPostPage() {
  const { idOrSlug } = useParams();
  const [post, setPost] = useState(DEFAULT_POST);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activeToc, setActiveToc] = useState('section-roles');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState([null, null, null, null, null]);

  // Activate cursor reactive and card tilt effects
  useCursorReactive();

  // Load post from backend API
  useEffect(() => {
    let isMounted = true;
    async function loadPost() {
      setLoading(true);
      const targetId = idOrSlug || '5';
      const data = await fetchPost(targetId);
      if (isMounted) {
        if (data && !data.error) {
          setPost((prev) => ({
            ...prev,
            ...data,
            imageUrl: data.imageUrl?.startsWith('http') ? data.imageUrl : (prev.imageUrl || '/images/blog-hero-startup-team.jpg'),
            author: {
              ...prev.author,
              ...(data.author || {}),
              avatarUrl: '/images/author-partha-sm.jpg'
            },
            related: (data.related && data.related.length > 0) ? data.related : prev.related
          }));
        } else {
          // If looking for a different ID that isn't post 5, try fallback or keep default
          console.info('Using local fallback post data for:', targetId);
        }
        setLoading(false);
      }
    }
    loadPost();
    return () => {
      isMounted = false;
    };
  }, [idOrSlug]);

  // Reading progress tracker & TOC scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, scrolled)));

      const sections = [
        'section-roles',
        'section-matrix',
        'section-talent',
        'section-culture',
        'section-motivation',
        'section-tldr',
        'section-quiz',
        'section-faqs'
      ];

      const scrollPos = window.scrollY + 180;
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveToc(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title || "How to Build a Tech Team For Your Startup?");
    let shareUrl = '';
    if (platform === 'LinkedIn') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'X') {
      shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleAnswerQuiz = (qIndex, val) => {
    const next = [...quizAnswers];
    next[qIndex] = val;
    setQuizAnswers(next);
  };

  const answeredQuizCount = quizAnswers.filter((a) => a !== null).length;
  const yesQuizCount = quizAnswers.filter((a) => a === true).length;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'December 11, 2020';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return 'December 11, 2020';
    }
  };

  const tocItems = [
    { id: 'section-roles', num: '01', label: 'Key Tech Roles' },
    { id: 'section-matrix', num: '02', label: 'Responsibilities Matrix' },
    { id: 'section-talent', num: '03', label: 'Attracting Top Talent' },
    { id: 'section-culture', num: '04', label: 'Winning Team Culture' },
    { id: 'section-motivation', num: '05', label: 'Keeping Team Motivated' },
    { id: 'section-tldr', num: '06', label: 'TL;DR Summary' },
    { id: 'section-quiz', num: '07', label: 'Interactive Quiz' },
    { id: 'section-faqs', num: '08', label: 'Frequently Asked Questions' }
  ];

  return (
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

      {/* Navigation Header */}
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          {/* Reading Progress Bar */}
          <div className="sticky top-20 z-40 w-full bg-surface-container-low h-1 backdrop-blur-md">
            {loading ? (
              <div className="h-full bg-primary/60 animate-pulse w-full"></div>
            ) : (
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-container transition-all duration-150"
                id="readingProgress"
                style={{ width: `${readingProgress}%` }}
              ></div>
            )}
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-8 pb-24">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <a href="/#blog" className="hover:text-primary transition-colors">
                Blog
              </a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="hover:text-primary transition-colors">
                {post.category?.name || "Startup Team Building"}
              </span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-on-surface font-semibold truncate max-w-xs md:max-w-md">
                {post.title}
              </span>
            </nav>

            {/* Editorial Header Section */}
            <header className="flex flex-col gap-6 max-w-4xl pb-10 border-b border-surface-container-high/60">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-container/30 text-on-primary-container">
                  {post.category?.name || "Startup Team Building"}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                  {post.readTimeMinutes || 6} min read
                </span>
                <span className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-headline font-bold text-on-surface tracking-tight leading-[1.12]">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed font-normal">
                {post.excerpt}
              </p>

              {/* Author Bar & Social Share Action Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <img
                    alt={post.author?.name || "Partha Chakraborty"}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-container/40"
                    src="/images/author-partha-sm.jpg"
                  />
                  <div>
                    <div className="font-headline font-bold text-sm text-on-surface">
                      {post.author?.name || "Partha Chakraborty"}
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      {post.author?.bio || "Founder of Tactyqal.com • 17+ Years in VC & Tech Ecosystems"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedLink ? 'done' : 'link'}
                    </span>
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                    aria-label="Bookmark"
                  >
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {isBookmarked ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>

                  <button
                    onClick={() => handleShare('LinkedIn')}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                    title="Share to LinkedIn"
                  >
                    <span className="font-bold text-xs">in</span>
                  </button>

                  <button
                    onClick={() => handleShare('X')}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                    title="Share to X"
                  >
                    <span className="font-bold text-xs">𝕏</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Hero Banner */}
            <div className="my-10 rounded-3xl overflow-hidden border border-outline/15 shadow-sm">
              <div
                className="w-full h-72 sm:h-96 md:h-[480px] bg-cover bg-center"
                style={{ backgroundImage: `url('/images/blog-hero-startup-team.jpg')` }}
              ></div>
            </div>

            {/* Two-Column Layout: Sidebar TOC + Main Article */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Sticky Aside: TOC & Mentor CTA */}
              <aside className="hidden lg:flex flex-col gap-8 w-72 shrink-0 sticky top-28 self-start">
                {/* Table of Contents Card */}
                <div className="interactive-spotlight-card p-6 rounded-3xl bg-surface-container/60 backdrop-blur-xl border border-primary/10">
                  <div className="flex items-center gap-2 font-headline font-bold text-sm text-on-surface uppercase tracking-wider mb-4">
                    <span className="material-symbols-outlined text-primary text-base">format_list_bulleted</span>
                    Table of Contents
                  </div>
                  <nav className="flex flex-col gap-2 text-xs">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`py-1.5 px-2.5 rounded-lg transition-all flex items-center gap-2 ${
                          activeToc === item.id
                            ? 'bg-primary text-on-primary font-bold shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        <span className="font-mono opacity-60 text-[10px]">{item.num}</span>
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Sticky Program CTA Card */}
                <div className="interactive-spotlight-card p-6 rounded-3xl bg-gradient-to-br from-primary-container/30 to-surface-container border border-primary/20 text-center">
                  <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center mx-auto mb-3 shadow">
                    <span className="material-symbols-outlined text-xl">rocket_launch</span>
                  </div>
                  <h4 className="font-headline font-bold text-sm text-on-surface leading-tight">
                    Go from No-idea to Full stack app in 8 weeks
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-2 mb-4 leading-relaxed">
                    1:1 Live Mentorship • Admissions to Best Colleges • Verified Grants
                  </p>
                  <button
                    onClick={() => setIsConsultationOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow hover:opacity-90 transition-all"
                  >
                    Book Free Consultation
                  </button>
                </div>
              </aside>

              {/* Main Article Content */}
              <article className="flex-1 max-w-3xl space-y-12">
                {/* Intro Narrative */}
                <div className="prose prose-sm sm:prose text-on-surface-variant leading-relaxed space-y-4">
                  <p className="text-base sm:text-lg text-on-surface leading-relaxed font-normal">
                    As an entrepreneur who’s been in the startup trenches, I know firsthand how crucial it is to build an A-team of rockstars. Your tech team is the beating heart of your company, responsible for breathing life into your vision and creating the products that will drive your success.
                  </p>
                  <p>
                    But assembling a high-performing tech squad is no walk in the park. It’s a delicate dance of finding the right talent, fostering a culture of collaboration and innovation, and keeping your team engaged and motivated for the long haul.
                  </p>
                  <p>
                    In this blog post, I’ll share my hard-won insights on how to build a tech team that can propel your startup to new heights. We’ll cover everything from identifying the key roles you need to fill, to attracting top talent, cultivating a winning team culture, and keeping your squad fired up and focused on smashing their goals.
                  </p>
                </div>

                {/* Section 01: Key Roles */}
                <section className="scroll-mt-28 flex flex-col gap-6" id="section-roles">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-container/30 text-primary font-headline font-bold flex items-center justify-center text-sm">
                      01
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface">
                      Understanding the Key Tech Roles
                    </h2>
                  </div>
                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                    Before diving head-first into talent hunting, you must crystallize the architectural competencies needed to build, ship, and scale your product. Every startup's tech stack evolves differently, yet these fundamental pillars define an early powerhouse:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="interactive-spotlight-card p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">terminal</span>
                        <h3>The Tech Lead / CTO</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        The technical quarterback. Sets overarching system architecture, guides product roadmaps, and mentors early developers while guarding code standards.
                      </p>
                    </div>

                    <div className="interactive-spotlight-card p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">layers</span>
                        <h3>Full-Stack Developers</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Versatile polyglots who build both frontend interfaces and server-side plumbing. They are the golden backbone of early lean execution.
                      </p>
                    </div>

                    <div className="interactive-spotlight-card p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">web</span>
                        <h3>Front-End Developers</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Specialists who transform mockups into pixel-perfect, lightning-fast, and accessible web experiences. Essential for consumer-facing apps.
                      </p>
                    </div>

                    <div className="interactive-spotlight-card p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">database</span>
                        <h3>Back-End Developers</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Engineers focused on scalable API design, high-concurrency database queries, enterprise auth systems, and foundational data structures.
                      </p>
                    </div>

                    <div className="interactive-spotlight-card p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">cloud_sync</span>
                        <h3>DevOps Engineers</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Automate zero-downtime CI/CD pipelines, container orchestration, and server health to guarantee high availability at scale.
                      </p>
                    </div>

                    <div className="interactive-spotlight-card p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">palette</span>
                        <h3>UI/UX &amp; QA Specialists</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Designers craft intuitive interactions while QA testers construct regression suites so bugs never degrade customer trust.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 02: Responsibilities Matrix Table */}
                <section className="scroll-mt-28 flex flex-col gap-6" id="section-matrix">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-container/30 text-primary font-headline font-bold flex items-center justify-center text-sm">
                      02
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface">
                      Role &amp; Responsibilities Matrix
                    </h2>
                  </div>
                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                    Use this clean delegation matrix when drafting job descriptions and establishing accountability during your first year of development:
                  </p>

                  <div className="overflow-x-auto rounded-2xl bg-surface-container-lowest shadow-sm border border-outline/10">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-surface-container-low text-on-surface font-semibold">
                        <tr>
                          <th className="py-3.5 px-5">Role Title</th>
                          <th className="py-3.5 px-5">Primary Core Deliverables</th>
                          <th className="py-3.5 px-5">Typical Startup Stage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container-high/40 text-on-surface-variant">
                        <tr className="hover:bg-surface-container-low/40 transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-on-surface">Tech Lead / CTO</td>
                          <td className="py-3.5 px-5">Architectural vision, roadmap planning, tech stack decisions, hiring mentor</td>
                          <td className="py-3.5 px-5">
                            <span className="px-2 py-0.5 rounded-full bg-primary-container/30 text-primary font-medium text-xs">
                              Pre-seed to Seed
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-surface-container-low/40 transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-on-surface">Full-Stack Developer</td>
                          <td className="py-3.5 px-5">End-to-end features, rapid MVP iterations, prototype validation</td>
                          <td className="py-3.5 px-5">
                            <span className="px-2 py-0.5 rounded-full bg-primary-container/30 text-primary font-medium text-xs">
                              Seed
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-surface-container-low/40 transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-on-surface">Front-End Developer</td>
                          <td className="py-3.5 px-5">Responsive layouts, component library, micro-animations, mobile UI</td>
                          <td className="py-3.5 px-5">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-medium text-xs">
                              Seed to Series A
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-surface-container-low/40 transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-on-surface">Back-End Developer</td>
                          <td className="py-3.5 px-5">API security, database schemas, asynchronous queues, 3rd party integrations</td>
                          <td className="py-3.5 px-5">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-medium text-xs">
                              Seed to Series A
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-surface-container-low/40 transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-on-surface">DevOps Engineer</td>
                          <td className="py-3.5 px-5">Automated CI/CD pipelines, container monitoring, cloud infrastructure scaling</td>
                          <td className="py-3.5 px-5">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-medium text-xs">
                              Late Seed / Series A
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-surface-container-low/40 transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-on-surface">UI/UX Designer</td>
                          <td className="py-3.5 px-5">User testing, Figma workflows, brand design systems, interface interaction</td>
                          <td className="py-3.5 px-5">
                            <span className="px-2 py-0.5 rounded-full bg-primary-container/30 text-primary font-medium text-xs">
                              Pre-seed / Seed
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-surface-container-low/40 transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-on-surface">QA Engineer</td>
                          <td className="py-3.5 px-5">End-to-end automated testing, bug logging, edge-case vulnerability sweeps</td>
                          <td className="py-3.5 px-5">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-medium text-xs">
                              Series A
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Section 03: Attracting Top Talent */}
                <section className="scroll-mt-28 flex flex-col gap-6" id="section-talent">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-container/30 text-primary font-headline font-bold flex items-center justify-center text-sm">
                      03
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface">
                      Attracting Top Talent
                    </h2>
                  </div>
                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                    Early-stage startups cannot compete with Big Tech's base salaries alone. To attract top engineers, you must build an authentic narrative and lean into advantages that corporations cannot offer:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">diversity_3</span>
                        Leverage Your Warm Network
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Referrals from trusted peers yield 3x higher retention. Tap founders, mentors, and previous engineering colleagues who share your work ethic.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">code</span>
                        Engage at Hackathons &amp; Tech Events
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Scout passionate builders in their natural habitat. Watch how candidates problem-solve in real-time under pressure before ever issuing an offer.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">savings</span>
                        Competitive Equity &amp; Upside
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Balance realistic cash with generous early equity options. Top engineers want true ownership in the venture's financial upside.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">flag</span>
                        Inspiring Mission &amp; Culture
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        The world’s best engineers want to solve complex, meaningful problems. Explain clearly why your product matters and who it empowers.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">speed</span>
                        Streamlined Hiring (Under 10 Days)
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Protracted, bureaucratic interview cycles lose candidates. Cap interviews at 2-3 focused stages and deliver offers swiftly.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined text-base">trending_up</span>
                        Sell the Accelerated Growth Path
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Joining an early-stage startup lets developers leapfrog corporate titles into Engineering Manager, Staff Developer, or VP of Engineering in 24 months.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 04: Cultivating Winning Culture */}
                <section className="scroll-mt-28 flex flex-col gap-6" id="section-culture">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-container/30 text-primary font-headline font-bold flex items-center justify-center text-sm">
                      04
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface">
                      Cultivating a Winning Team Culture
                    </h2>
                  </div>
                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                    Culture isn't free snacks or ping pong tables; it's how your squad communicates, resolves disagreements, and responds to failure when production bugs arise:
                  </p>

                  <div className="flex flex-col gap-3.5">
                    <div className="p-4 rounded-xl bg-surface-container-lowest/70 flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl mt-0.5">ads_click</span>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Establish Clear Goals &amp; OKRs</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          Ensure every engineer understands the company roadmap, sprint objectives, and individual expectations clearly.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-lowest/70 flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl mt-0.5">chat_bubble</span>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Encourage Open Dialogue &amp; Blameless Post-Mortems</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          When production breaks, analyze system flaws rather than pointing fingers at individuals. Psychological safety sparks bold innovation.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-lowest/70 flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl mt-0.5">hub</span>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Promote Peer Collaboration &amp; Code Reviews</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          Two pairs of eyes on every pull request builds shared code ownership and accelerates knowledge sharing across the squad.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-lowest/70 flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl mt-0.5">public</span>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Embrace Diversity of Thought &amp; Background</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          Varied life perspectives discover edge cases faster and design richer products for global customer demographics.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-lowest/70 flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl mt-0.5">bedtime</span>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Prioritize Sustainable Work Rhythms</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          Startup marathons cannot be won on perpetual sleep deprivation. Encourage mental decompression to maintain cognitive velocity.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 05: Keeping Team Motivated */}
                <section className="scroll-mt-28 flex flex-col gap-6" id="section-motivation">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-container/30 text-primary font-headline font-bold flex items-center justify-center text-sm">
                      05
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface">
                      Keeping Your Tech Team Motivated
                    </h2>
                  </div>
                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                    Talented developers stay when they feel autonomous, respected, and continually challenged. Use these levers to sustain momentum:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2 text-center items-center">
                      <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center mb-1">
                        <span className="material-symbols-outlined text-2xl">trophy</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface">Celebrate Every Milestone</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        From merging a complex refactor to landing your first 1,000 active users, acknowledge incremental victories frequently.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2 text-center items-center">
                      <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center mb-1">
                        <span className="material-symbols-outlined text-2xl">psychology</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface">Radical Autonomy</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Define the "what" and the "why", but leave the architectural "how" to your developers. Micro-management kills tech passion.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-2 text-center items-center">
                      <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center mb-1">
                        <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface">Lead by Example</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Founders must demonstrate work ethic, transparency, and deep empathy. Passion is contagious and keeps teams steady in tough markets.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 06: TL;DR Summary */}
                <section
                  className="scroll-mt-28 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary-container/20 to-surface-container-lowest shadow-sm border border-primary/20"
                  id="section-tldr"
                >
                  <div className="flex items-center gap-2.5 text-primary mb-3">
                    <span className="material-symbols-outlined text-2xl">bolt</span>
                    <h3 className="font-headline font-bold text-lg md:text-xl text-on-surface">
                      TL;DR: Key Takeaways
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-on-surface-variant">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                      <span><strong>Prioritize versatile generalists:</strong> Full-stack developers outperform narrow specialists in the seed stage.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                      <span><strong>Move quickly:</strong> Keep hiring workflows under 10 days to secure top candidates before competitors make offers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                      <span><strong>Build trust:</strong> Foster psychological safety through blameless retrospectives and autonomous sprint ownership.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                      <span><strong>Compensate with upside:</strong> Leverage clear equity vesting to build long-term alignment and company loyalty.</span>
                    </li>
                  </ul>
                </section>

                {/* Section 07: Interactive Quiz */}
                <section className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-surface-container-lowest shadow-md border border-primary/10" id="section-quiz">
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined">quiz</span>
                      <span className="text-xs font-bold uppercase tracking-wider">Self Assessment</span>
                    </div>
                    <h3 className="text-2xl font-headline font-bold text-on-surface">
                      Interactive Quiz: Is Your Tech Team Strategy Ready?
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant">
                      Answer the 5 questions below to diagnose your startup's technical hiring readiness in real time.
                    </p>
                  </div>

                  <form className="flex flex-col gap-4">
                    {QUIZ_QUESTIONS.map((question, qIdx) => (
                      <div
                        key={qIdx}
                        className="p-4 rounded-xl bg-surface-container-low/60 flex items-center justify-between gap-4"
                      >
                        <span className="text-xs sm:text-sm font-medium text-on-surface">
                          {qIdx + 1}. {question}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleAnswerQuiz(qIdx, true)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              quizAnswers[qIdx] === true
                                ? 'bg-primary text-on-primary shadow-sm'
                                : 'bg-surface-container text-on-surface hover:bg-surface-variant'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAnswerQuiz(qIdx, false)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              quizAnswers[qIdx] === false
                                ? 'bg-primary text-on-primary shadow-sm'
                                : 'bg-surface-container text-on-surface hover:bg-surface-variant'
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ))}
                  </form>

                  {/* Quiz Feedback Box */}
                  {answeredQuizCount === 5 && (
                    <div className="mt-6 p-5 rounded-2xl bg-surface-container-low border border-primary-container/40 animate-in fade-in">
                      <div className="flex items-center gap-2 font-headline font-bold text-sm text-primary mb-1">
                        <span className="material-symbols-outlined text-lg">assessment</span>
                        Your Assessment Score: <span className="text-on-surface">{yesQuizCount}/5 YES Answers</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {yesQuizCount === 5 &&
                          "Congratulations! You have a bulletproof talent strategy and understand both the architectural roles and retention dynamics needed to ship and scale rapidly."}
                        {yesQuizCount >= 3 && yesQuizCount < 5 &&
                          "You're on the right track! Fine-tune your hiring velocity and compensation structure to ensure top candidates choose your mission over competitors."}
                        {yesQuizCount < 3 &&
                          "Your hiring blueprint needs refinement before issuing contracts. Focus first on defining your CTO/Full-stack role profiles and establishing sustainable team culture protocols."}
                      </p>
                    </div>
                  )}
                </section>

                {/* Author Bio Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low/70 border border-outline/15 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <img
                    alt="Partha Chakraborty"
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-surface-container-lowest shrink-0"
                    src="/images/author-partha-lg.jpg"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div>
                        <h4 className="font-headline font-bold text-base text-on-surface">
                          Written by {post.author?.name || "Partha Chakraborty"}
                        </h4>
                        <p className="text-xs text-primary font-semibold">
                          {post.author?.bio || "Founder of Tactyqal.com • 17+ Years in VC & Tech Ecosystems"}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                      Founder, venture scout, and angel mentor. Helped launch 50+ early-stage applications across enterprise SaaS, AI tools, and fintech. Dedicated to empowering the next generation of teenage and early-stage founders.
                    </p>
                  </div>
                </div>

                {/* Section 08: Frequently Asked Questions */}
                <section className="scroll-mt-28 flex flex-col gap-6" id="section-faqs">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-container/30 text-primary font-headline font-bold flex items-center justify-center text-sm">
                      08
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="flex flex-col gap-3">
                    <details className="group rounded-2xl bg-surface-container-lowest p-5 [&_summary::-webkit-details-marker]:hidden shadow-sm border border-outline/10">
                      <summary className="flex items-center justify-between cursor-pointer font-headline font-semibold text-sm sm:text-base text-on-surface list-none">
                        <span>What if I can’t afford to offer competitive market salaries?</span>
                        <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Focus on high upside: offer meaningful equity stakes with 4-year vesting schedules and 1-year cliffs. Complement this with immense autonomy, remote flexibility, and mentorship that accelerates their technical trajectory.
                      </div>
                    </details>

                    <details className="group rounded-2xl bg-surface-container-lowest p-5 [&_summary::-webkit-details-marker]:hidden shadow-sm border border-outline/10">
                      <summary className="flex items-center justify-between cursor-pointer font-headline font-semibold text-sm sm:text-base text-on-surface list-none">
                        <span>How do I foster truly open communication within my team?</span>
                        <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Establish weekly one-on-ones, hold anonymous pulse checks, and run blameless post-mortems when system failures happen. When leaders publicly acknowledge their own errors, psychological safety takes root across the engineering organization.
                      </div>
                    </details>

                    <details className="group rounded-2xl bg-surface-container-lowest p-5 [&_summary::-webkit-details-marker]:hidden shadow-sm border border-outline/10">
                      <summary className="flex items-center justify-between cursor-pointer font-headline font-semibold text-sm sm:text-base text-on-surface list-none">
                        <span>What’s the most constructive way to handle tech stack disagreements?</span>
                        <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Use Request For Comments (RFC) documents. Have disagreeing parties formulate their technical arguments with benchmark data, maintenance overhead, and developer velocity metrics. The Tech Lead or CTO makes the final documented decision.
                      </div>
                    </details>

                    <details className="group rounded-2xl bg-surface-container-lowest p-5 [&_summary::-webkit-details-marker]:hidden shadow-sm border border-outline/10">
                      <summary className="flex items-center justify-between cursor-pointer font-headline font-semibold text-sm sm:text-base text-on-surface list-none">
                        <span>Should early-stage startups hire generalists or specialists?</span>
                        <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Hire generalists first. Versatile full-stack developers allow you to pivot feature sets without waiting on distinct handoffs. Once product-market fit is achieved and infrastructure complexity surges, layer in dedicated DevOps and data engineers.
                      </div>
                    </details>
                  </div>
                </section>
              </article>
            </div>

            {/* Recommended Articles Section */}
            <section className="pt-20 border-t border-surface-container-high/60 mt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-primary text-xs uppercase tracking-widest font-semibold">
                    Related Insights
                  </span>
                  <h3 className="text-2xl font-headline font-bold text-on-surface mt-1">
                    Recommended for Startup Founders
                  </h3>
                </div>
                <Link to="/#blog" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                  Explore full library <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(post.related || []).map((rel, idx) => (
                  <Link
                    key={rel.id || idx}
                    to={`/blog/${rel.slug || rel.id}`}
                    className="interactive-spotlight-card rounded-2xl bg-surface-container-lowest border border-outline/10 overflow-hidden flex flex-col group hover:border-primary/40 transition-all"
                  >
                    <div
                      className="h-44 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{
                        backgroundImage: `url('${
                          idx === 0
                            ? '/images/blog-toxic-culture.jpg'
                            : idx === 1
                            ? '/images/blog-hiring-interns.jpg'
                            : '/images/blog-no-code-ideas.jpg'
                        }')`
                      }}
                    ></div>
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-primary font-mono mb-2">
                          <span>{rel.category?.name || "Technology"}</span>
                          <span>{rel.readTimeMinutes || 4} min read</span>
                        </div>
                        <h4 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-on-surface-variant mt-1.5 line-clamp-2 leading-relaxed">
                          {rel.excerpt}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-outline/10 text-xs text-primary font-semibold flex items-center gap-1">
                        Read Guide <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Bottom Call to Action Banner */}
            <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary to-primary-container text-on-primary flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(125,211,252,0.3)]">
              <div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold">
                  Launch Your MVP In 8 Weeks. 1:1 Live Mentorship.
                </h3>
                <p className="text-sm opacity-90 mt-1 max-w-xl">
                  Work directly with industry veterans to build full-stack apps with zero coding barrier. Limited cohort spots available.
                </p>
              </div>
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="px-8 py-3.5 rounded-xl bg-surface text-primary font-bold text-sm shadow hover:scale-105 transition-transform whitespace-nowrap"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
