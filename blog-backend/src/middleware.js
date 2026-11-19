const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const requireAdmin = (req, res, next) => {
  const key = process.env.ADMIN_API_KEY;
  if (!key || req.get("x-api-key") !== key) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

const notFound = (req, res) => res.status(404).json({ error: "Route not found" });

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.code === "P2002") return res.status(409).json({ error: "Already exists (duplicate slug or name)" });
  if (err.code === "P2025") return res.status(404).json({ error: "Not found" });
  if (err.code === "P2003") return res.status(400).json({ error: "Invalid authorId or categoryId" });
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};

module.exports = { asyncHandler, requireAdmin, notFound, errorHandler };
