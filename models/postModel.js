const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  media: { type: String }, // Image or Video URL
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
