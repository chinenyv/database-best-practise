const express = require("express");
const { registerUser, getUser, followUser, updateUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/:userId", getUser);
router.put("/:userId/follow", followUser);
router.put("/:userId", updateUser);

module.exports = router;
