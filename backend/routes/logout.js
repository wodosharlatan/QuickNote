const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const axios = require("axios");

// Add env variables
require("dotenv").config();

// Delete token for a specific user by Token on logout
router.patch("/:Token/Logout", async (req, res) => {
	try {
		await User.updateMany(
			{ UserToken: req.params.Token },
			{ $set: { UserToken: "" } }
		);
		res.json({ message: "Logged out! Token Deleted" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;