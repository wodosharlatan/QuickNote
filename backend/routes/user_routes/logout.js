const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const AuthenticateUser = require("../../functions");

// Add env variables
require("dotenv").config();

// Delete token for a specific user by Token on logout
router.patch("/", async (req, res) => {
	try {
		if ((await AuthenticateUser(req.body.token)) === false) {
			res.json({ message: "Unauthorized" });
			return;
		}

		await User.updateMany(
			{ UserToken: req.body.token },
			{ $set: { UserToken: "" } }
		);
		res.json({ message: "Logged out! Token Deleted" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
