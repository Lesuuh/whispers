const express = require("express");
const {
  getAllPosts,
  createPost,
  getPost,
  comments,
  incrementShare,
  getTrendingPosts,
} = require("../../controllers/postController");

const router = express.Router();
const anonymousIdentity = require("../../middlewares/anonIdentity");
const { simpleRateLimiter } = require("../../middlewares/rateLimitMiddleware");

// const globalLimiter = simpleRateLimiter(50, 60 * 1000);
const strictLimiter = simpleRateLimiter(5, 60 * 60 * 1000);

router.get("/", getAllPosts);

// router.post("/", createPost);

router.get("/trending", getTrendingPosts);

router.get("/:id", getPost);

// router.post("/:id/comments", comments);

// router.post("/:id/share", incrementShare);

router.post("/", anonymousIdentity, strictLimiter, createPost);
router.post("/:id/comments", anonymousIdentity, strictLimiter, comments);
router.post("/:id/share", anonymousIdentity, strictLimiter, incrementShare);

module.exports = router;
