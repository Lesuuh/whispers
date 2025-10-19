const express = require("express");
const {
  getAllPosts,
  createPost,
  getPost,
  comments,
  incrementShare,
} = require("../../controllers/postController");

const router = express.Router();

router.get("/", getAllPosts);

router.post("/", createPost);

router.get("/:id", getPost);

router.post("/:id/comments", comments);

router.post("/:id/share", incrementShare);

module.exports = router;
