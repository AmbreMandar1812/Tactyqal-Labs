const router = require("express").Router();
const prisma = require("../db");
const { asyncHandler, requireAdmin } = require("../middleware");
const { slugify, readTime } = require("../utils");

const listSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  imageUrl: true,
  readTimeMinutes: true,
  publishedAt: true,
  author: { select: { id: true, name: true, avatarUrl: true } },
  category: { select: { id: true, name: true, slug: true } },
  tags: { select: { id: true, name: true, slug: true } },
};

const tagOps = (names = []) =>
  names.map((name) => ({
    where: { slug: slugify(name) },
    create: { name, slug: slugify(name) },
  }));

// GET /api/posts?page=1&limit=9&category=tech&tag=node&q=search
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 9, 1), 50);
    const { category, tag, q } = req.query;

    const where = { published: true, publishedAt: { lte: new Date() } };
    if (category) where.category = { slug: String(category) };
    if (tag) where.tags = { some: { slug: String(tag) } };
    if (q) {
      const contains = { contains: String(q), mode: "insensitive" };
      where.OR = [{ title: contains }, { excerpt: contains }, { content: contains }];
    }

    const [total, data] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        select: listSelect,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    res.json({
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  })
);

// GET /api/posts/:idOrSlug  (numeric = id, otherwise slug)
router.get(
  "/:idOrSlug",
  asyncHandler(async (req, res) => {
    const { idOrSlug } = req.params;
    const where = /^\d+$/.test(idOrSlug)
      ? { id: Number(idOrSlug) }
      : { slug: idOrSlug };

    const post = await prisma.post.findFirst({
      where: { ...where, published: true },
      include: { author: true, category: true, tags: true },
    });
    if (!post) return res.status(404).json({ error: "Post not found" });

    const related = await prisma.post.findMany({
      where: { categoryId: post.categoryId, id: { not: post.id }, published: true },
      select: listSelect,
      orderBy: { publishedAt: "desc" },
      take: 3,
    });

    res.json({ ...post, related });
  })
);

// ---- Admin-only (send header: x-api-key) ----

router.post(
  "/",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { title, content, excerpt, imageUrl, authorId, categoryId, tags, published, publishedAt, slug } = req.body;
    if (!title || !content || !authorId || !categoryId) {
      return res.status(400).json({ error: "title, content, authorId and categoryId are required" });
    }
    const post = await prisma.post.create({
      data: {
        title,
        slug: slug || slugify(title),
        content,
        excerpt: excerpt || content.slice(0, 160),
        imageUrl,
        readTimeMinutes: readTime(content),
        published: published ?? true,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        authorId: Number(authorId),
        categoryId: Number(categoryId),
        tags: { connectOrCreate: tagOps(tags) },
      },
      include: { author: true, category: true, tags: true },
    });
    res.status(201).json(post);
  })
);

router.put(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { title, content, excerpt, imageUrl, authorId, categoryId, tags, published, publishedAt, slug } = req.body;
    const data = {};
    if (title !== undefined) data.title = title;
    if (slug !== undefined) data.slug = slug;
    if (content !== undefined) { data.content = content; data.readTimeMinutes = readTime(content); }
    if (excerpt !== undefined) data.excerpt = excerpt;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (published !== undefined) data.published = published;
    if (publishedAt !== undefined) data.publishedAt = new Date(publishedAt);
    if (authorId !== undefined) data.authorId = Number(authorId);
    if (categoryId !== undefined) data.categoryId = Number(categoryId);
    if (tags !== undefined) data.tags = { set: [], connectOrCreate: tagOps(tags) };

    const post = await prisma.post.update({
      where: { id: Number(req.params.id) },
      data,
      include: { author: true, category: true, tags: true },
    });
    res.json(post);
  })
);

router.delete(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    await prisma.post.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  })
);


module.exports = router;
