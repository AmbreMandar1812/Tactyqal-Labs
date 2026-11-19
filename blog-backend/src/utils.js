const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const readTime = (content) =>
  Math.max(1, Math.ceil(String(content).split(/\s+/).length / 200));

module.exports = { slugify, readTime };
