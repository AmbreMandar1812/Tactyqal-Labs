import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../services/api';
import { blogArticles as fallbackArticles } from '../data/content';

// Mapping helper to provide high-res design assets from Stitch for backend posts
function getPostImage(post, index) {
  const title = (post.title || '').toLowerCase();
  if (title.includes('tech team') || post.id === 5) {
    return '/images/blog-hero-startup-team.jpg';
  }
  if (title.includes('ai') || post.id === 6) {
    return '/images/blog-toxic-culture.jpg';
  }
  if (title.includes('web application') || post.id === 7) {
    return '/images/blog-no-code-ideas.jpg';
  }
  if (post.imageUrl && !post.imageUrl.includes('picsum.photos')) {
    return post.imageUrl;
  }
  const defaults = [
    '/images/blog-hero-startup-team.jpg',
    '/images/blog-toxic-culture.jpg',
    '/images/blog-no-code-ideas.jpg'
  ];
  return defaults[index % defaults.length];
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const response = await fetchPosts({ limit: 6 });
        if (isMounted) {
          if (response && response.data && response.data.length > 0) {
            // Sort to place Post 5 (Tech Team guide) in prime position
            const sorted = [...response.data].sort((a, b) => {
              if (a.id === 5) return -1;
              if (b.id === 5) return 1;
              return 0;
            });
            setPosts(sorted);
          } else {
            // Fallback to static data if backend returned empty
            setPosts(fallbackArticles);
          }
          setLoading(false);
        }
      } catch (err) {
        console.warn('Could not load blog posts, using fallback content', err);
        if (isMounted) {
          setPosts(fallbackArticles);
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayList = posts.length > 0 ? posts : fallbackArticles;

  return (
    <section className="py-24 px-6 lg:px-12" id="blog">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Tactyqal Insights & Engineering Blueprint
          </div>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-on-surface">
            Learn from Industry Founders & Veterans
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Tactical playbooks, engineering hiring frameworks, and startup acceleration strategies directly from experienced mentors.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 rounded-3xl bg-surface-container/40 animate-pulse border border-outline/10 p-6 flex flex-col justify-between"
              >
                <div className="w-full h-44 bg-surface-container-high rounded-2xl"></div>
                <div className="space-y-3 mt-4">
                  <div className="h-4 bg-surface-container-high rounded w-1/3"></div>
                  <div className="h-6 bg-surface-container-high rounded w-3/4"></div>
                  <div className="h-3 bg-surface-container-high rounded w-full"></div>
                </div>
                <div className="h-4 bg-surface-container-high rounded w-1/4 mt-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayList.map((article, i) => {
              const targetSlug = article.slug || article.id || 5;
              const imageUrl = getPostImage(article, i);
              const readTime = article.readTimeMinutes
                ? `${article.readTimeMinutes} min read`
                : (article.meta?.split('•')[1]?.trim() || '6 min read');
              const categoryName = article.category?.name || article.meta?.split('•')[0]?.trim() || 'Startup Blueprint';
              const authorName = article.author?.name || 'Partha Chakraborty';

              return (
                <article
                  key={article.id || i}
                  className="interactive-spotlight-card rounded-3xl bg-surface-container/60 backdrop-blur-xl border border-primary/10 overflow-hidden flex flex-col justify-between group hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  <div>
                    <Link
                      to={`/blog/${targetSlug}`}
                      className="block relative h-52 overflow-hidden bg-surface-container-high"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        style={{ backgroundImage: `url('${imageUrl}')` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-surface/90 text-primary border border-primary/20 backdrop-blur-md">
                          {categoryName}
                        </span>
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant font-mono mb-2">
                        <span>{readTime}</span>
                        <span>•</span>
                        <span>By {authorName}</span>
                      </div>
                      <h3 className="font-bold text-xl text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug">
                        <Link to={`/blog/${targetSlug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                        {article.excerpt || article.snippet}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-outline/5 mt-2 flex items-center justify-between">
                    <Link
                      className="text-xs font-bold text-primary inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                      to={`/blog/${targetSlug}`}
                    >
                      Read Full Article{' '}
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                    <span className="text-[11px] font-mono text-outline">
                      {article.id === 5 ? 'FEATURED' : 'GUIDE'}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
