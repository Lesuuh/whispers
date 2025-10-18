const express = require("express");
const {
  getAllPosts,
  createPost,
  getPost,
  comments,
} = require("../../controllers/postController");

const router = express.Router();

router.get("/", getAllPosts);

router.post("/", createPost);

router.get("/:id", getPost);

router.post("/:id/comments", comments);

module.exports = router;
