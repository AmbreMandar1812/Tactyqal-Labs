require("dotenv").config();
const express = require("express");
const cors = require("cors");
const postsRouter = require("./routes/posts");
const metaRouter = require("./routes/meta");
const { notFound, errorHandler } = require("./middleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/posts", postsRouter);
app.use("/api", metaRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
