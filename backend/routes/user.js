const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const axios = require("axios");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();

// Add env variables
require("dotenv").config();

// Get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();

		const result = users.map((user) => {
			// Return only necessary info for each user As JSON
			return {
				Username: user.Username,
				IsAdmin: user.IsAdmin,
				LastLogin: user.LastLogin,
				FirstTimeLogin: user.FirstTimeLogin,
				UserToken: user.UserToken,
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
		const oneUser = await User.findOne({ Username: req.params.username });

		const result = {
			Username: oneUser.Username,
			IsAdmin: oneUser.IsAdmin,
			LastLogin: oneUser.LastLogin,
			FirstTimeLogin: oneUser.FirstTimeLogin,
			UserToken: oneUser.UserToken,
		};

		res.json(result);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Change Password for a specific user by Token
router.patch("/:Token", async (req, res) => {
	try {
		await User.updateMany(
			{ UserToken: req.params.token },
			{ $set: { Password: req.body.password, FirstTimeLogin: false } }
		);
		res.json({ message: "Password changed!" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});


// Change Last Login for a specific user by Token
router.patch("/:Token/ChangeLastLogin", async (req, res) => {
	try {
		const updatedUser = await User.updateMany(
			{ UserToken: req.params.token },
			{ $set: { LastLogin: Date.now() } }
		);
		res.json(updatedUser);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});



// Delete a specific user by Token
router.delete("/:token", async (req, res) => {
	try {
		await User.deleteOne({ UserToken: req.params.token });
		res.json({ message: "User deleted!" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Make user Admin
router.patch("/:token/admin", async (req, res) => {
	try {
		await User.updateMany(
			{ UserToken: req.params.token },
			{ $set: { IsAdmin: true } }
		);
		res.json({ message: "Admin privileges granted !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
