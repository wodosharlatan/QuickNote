const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();
const saltedSha256 = require("salted-sha256");

// Add env variables
require("dotenv").config();

// Change Password for a specific user by Token
router.patch("/:Token/ChangePassword", async (req, res) => {
	try {
		await User.updateMany(
			{ UserToken: req.params.Token },
			{
				$set: {
					Password: saltedSha256(`${req.body.password}`, "SUPER-SALT"),
					FirstTimeLogin: false,
				},
			}
		);
		res.json({ message: "Password changed !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Change Last Login for a specific user by Token
router.patch("/:Token/ChangeLastLogin", async (req, res) => {
	try {
		const updatedUser = await User.updateMany(
			{ UserToken: req.params.Token },
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
		await User.deleteOne({ UserToken: req.params.Token });
		res.json({ message: "User deleted !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Make user Admin
router.patch("/:Token/Admin", async (req, res) => {
	try {
		await User.updateMany(
			{ UserToken: req.params.Token },
			{ $set: { IsAdmin: true } }
		);
		res.json({ message: "Admin privileges granted !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Generate Token for a specific user by Username on login
router.patch("/:Username", async (req, res) => {
	try {
		const token = await uidgen.generate();
		await User.updateMany(
			{ Username: req.params.Username },
			{ $set: { UserToken: token } }
		);
		res.json({ message: "Token Generated !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
