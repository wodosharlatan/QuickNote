const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const axios = require("axios");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();
const saltedSha256 = require("salted-sha256");
const AuthenticateAdmin = require("../../functions");

// Add env variables
require("dotenv").config();

// Make new user
router.post("/", async (req, res) => {
	try {
		if (!(await AuthenticateAdmin(req.body.token))) {
			res.json({ message: "Unauthorized" });
			return;
		}

		// Check if username already exists
		const username = req.body.username.trim();

		const oneUser = await User.findOne({ Username: username });
		if (oneUser.username === username) {
			res.json({ message: "Username already exists!" });
			return;
		}

		const uid = await uidgen.generate();

		// Create new user
		const user = new User({
			Username: username,
			Password: saltedSha256(`${uid}`, "SUPER-SALT"),
		});

		await user.save();
		res.json({
			message: `User created with temporary password: ${uid}.`,
		});
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

module.exports = router;
