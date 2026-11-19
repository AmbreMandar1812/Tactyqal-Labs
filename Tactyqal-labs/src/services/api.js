/**
 * Blog Backend API Client
 * Proxied via Vite to http://localhost:5000 in development
 */

const API_BASE = '/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API health check failed:', err);
    return null;
  }
}

export async function fetchPosts({ page = 1, limit = 9, category, tag, q } = {}) {
  try {
    const params = new URLSearchParams();
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    if (category) params.set('category', category);
    if (tag) params.set('tag', tag);
    if (q) params.set('q', q);

    const res = await fetch(`${API_BASE}/posts?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch posts from API:', err);
    return null;
  }
}

export async function fetchPost(idOrSlug) {
  try {
    const res = await fetch(`${API_BASE}/posts/${encodeURIComponent(idOrSlug)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Failed to fetch post '${idOrSlug}':`, err);
    return null;
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch categories:', err);
    return [];
  }
}

export async function fetchTags() {
  try {
    const res = await fetch(`${API_BASE}/tags`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch tags:', err);
    return [];
  }
}

export async function fetchAuthors() {
  try {
    const res = await fetch(`${API_BASE}/authors`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch authors:', err);
    return [];
  }
}
