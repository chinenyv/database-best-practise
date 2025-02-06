const Post = require("../models/postModel");
const User = require("../models/userModel");

// Create a post
exports.createPost = async (req, res) => {
  try {
    const { user, content, media } = req.body;
    const newPost = new Post({ user, content, media });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Comment on a post
exports.commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { user, text } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user, text });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
