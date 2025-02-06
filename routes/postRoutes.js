const express = require("express");
const { createPost, likePost, commentPost, deletePost } = require("../controllers/postController");

const router = express.Router();

router.post("/", createPost);
router.put("/:postId/like", likePost);
router.put("/:postId/comment", commentPost);
router.delete("/:postId", deletePost);

module.exports = router;
