const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const AuthenticateAdmin = require("../../functions");
// Add env variables
require("dotenv").config();

// Get all users
router.get("/", async (req, res) => {
	try {
		if (!(await AuthenticateAdmin(req.body.token))) {
			res.json({ message: "Unauthorized" });
			return;
		}

		const users = await User.find();

		const result = users.map((user) => {
			// Return only necessary info for each user As JSON
			return {
				Username: user.Username,
				IsAdmin: user.IsAdmin,
				LastLogin: user.LastLogin,
				FirstTimeLogin: user.FirstTimeLogin,
			};
		});

		res.json(result);
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

// Get a specific user by username
router.get("/:Username", async (req, res) => {
	try {
		if (!(await AuthenticateAdmin(req.body.token))) {
			res.json({ message: "Unauthorized" });
			return;
		}

		const oneUser = await User.findOne({ Username: req.params.Username });

		const result = {
			Username: oneUser.Username,
			IsAdmin: oneUser.IsAdmin,
			LastLogin: oneUser.LastLogin,
			FirstTimeLogin: oneUser.FirstTimeLogin,
		};

		res.json(result);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Delete a specific user by username
router.delete("/", async (req, res) => {
	try {
		if (!(await AuthenticateAdmin(req.body.token))) {
			res.json({ message: "Unauthorized" });
			return;
		}

		await User.deleteOne({ Username: req.body.username });
		res.json({ message: "User deleted !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;