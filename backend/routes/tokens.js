const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const axios = require("axios");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();

// Add env variables
require("dotenv").config();

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
router.delete("/:Token", async (req, res) => {
	try {
		await User.deleteOne({ UserToken: req.params.token });
		res.json({ message: "User deleted!" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Make user Admin
router.patch("/:Token/Admin", async (req, res) => {
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