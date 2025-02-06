const User = require("../models/userModel");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("followers following");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Follow/Unfollow a user
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { followerId } = req.body;

    if (userId === followerId) return res.status(400).json({ message: "You cannot follow yourself" });

    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!user || !follower) return res.status(404).json({ message: "User not found" });

    if (user.followers.includes(followerId)) {
      user.followers.pull(followerId);
      follower.following.pull(userId);
      await user.save();
      await follower.save();
      return res.json({ message: "Unfollowed successfully" });
    }

    user.followers.push(followerId);
    follower.following.push(userId);
    await user.save();
    await follower.save();
    
    res.json({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
