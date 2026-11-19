const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const para = "This is sample content for the post. Replace it with your real writing. ";

async function main() {
  const author = await prisma.author.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Jane Doe", bio: "Writer and developer." },
  });

  const [tech, life] = await Promise.all(
    [["Technology", "technology"], ["Lifestyle", "lifestyle"]].map(([name, slug]) =>
      prisma.category.upsert({ where: { slug }, update: {}, create: { name, slug } })
    )
  );

  const posts = [
    { title: "Getting Started with Node.js", slug: "getting-started-with-nodejs", category: tech, tags: ["node", "backend"] },
    { title: "Why PostgreSQL Is Great", slug: "why-postgresql-is-great", category: tech, tags: ["database"] },
    { title: "Building Better Daily Habits", slug: "building-better-daily-habits", category: life, tags: ["habits"] },
  ];

  for (const p of posts) {
    const content = para.repeat(60);
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        title: p.title,
        slug: p.slug,
        excerpt: "A short summary of " + p.title + ".",
        content,
        readTimeMinutes: Math.ceil(content.split(/\s+/).length / 200),
        authorId: author.id,
        categoryId: p.category.id,
        tags: {
          connectOrCreate: p.tags.map((t) => ({ where: { slug: t }, create: { name: t, slug: t } })),
        },
      },
    });
  }
  console.log("Seeded.");
}

main().finally(() => prisma.$disconnect());
