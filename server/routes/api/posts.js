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

router.get("/", getAllPosts);

// router.post("/", createPost);

router.get("/trending", getTrendingPosts);

router.get("/:id", getPost);

// router.post("/:id/comments", comments);

// router.post("/:id/share", incrementShare);

router.post("/", anonymousIdentity, createPost);
router.post("/:id/comments", anonymousIdentity, comments);
router.post("/:id/share", anonymousIdentity, incrementShare);

module.exports = router;
