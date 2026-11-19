const router = require("express").Router();
const prisma = require("../db");
const { asyncHandler, requireAdmin } = require("../middleware");
const { slugify } = require("../utils");

const publishedCount = { where: { published: true } };

// GET /api/categories
router.get(
  "/categories",
  asyncHandler(async (req, res) => {
    const rows = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: publishedCount } } },
    });
    res.json(rows.map(({ _count, ...c }) => ({ ...c, postCount: _count.posts })));
  })
);

// GET /api/tags
router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const rows = await prisma.tag.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: publishedCount } } },
    });
    res.json(rows.map(({ _count, ...t }) => ({ ...t, postCount: _count.posts })));
  })
);

// GET /api/authors
router.get(
  "/authors",
  asyncHandler(async (req, res) => {
    res.json(await prisma.author.findMany({ orderBy: { name: "asc" } }));
  })
);

// ---- Admin-only helpers so you can create authors/categories ----
router.post(
  "/authors",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { name, avatarUrl, bio } = req.body;
    if (!name) return res.status(400).json({ error: "name is required" });
    res.status(201).json(await prisma.author.create({ data: { name, avatarUrl, bio } }));
  })
);

router.post(
  "/categories",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "name is required" });
    res.status(201).json(await prisma.category.create({ data: { name, slug: slugify(name) } }));
  })
);

router.delete("/tags/:id",requireAdmin,
  asyncHandler(async (req, res) => {
    await prisma.tag.delete({where: {id: Number(req.params.id)}});
    res.status(204).end();
  })
)

router.put("/tags/:id", requireAdmin,
  asyncHandler(async (req,res) => {
    const {name,slug,posts} = req.body;
    const data = {};
    if(name != undefined)data.name = name;
    if(slug != undefined)data.slug = slug;
    if(posts != undefined)data.posts = posts;

    const tag = await prisma.tag.update({
      where: {id:Number(req.params.id)},
      data
    });
    res.json(tag)
  })
)

module.exports = router;
