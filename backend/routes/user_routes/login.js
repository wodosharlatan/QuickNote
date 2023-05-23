const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../../models/user_model");
const saltedSha256 = require("salted-sha256");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();

// Add env variables
require("dotenv").config();

router.post("/", async (req, res) => {
	// Find one user with the username

	authorizedUsername = "";

	try {
		const oneUser = await User.findOne({ Username: req.body.username });

		const result = {
			Username: oneUser.Username,
			Password: oneUser.Password,
		};

		if (
			result.Username === req.body.username &&
			result.Password === saltedSha256(`${req.body.password}`, "SUPER-SALT")
		) {
			authorizedUsername = result.Username;
		} else {
			res.json({ message: "Invalid username or password" });
			return;
		}
	} catch (error) {
		res.json({ message: "Invalid username or password" });
	}

	try {
		const token = await uidgen.generate();
		await User.updateMany(
			{ Username: authorizedUsername },
			{ $set: { UserToken: token, LastLogin: Date.now() } }
		);
	} catch (error) {
		res.json({ message: error.toString() });
	}

	try {
		const oneUser = await User.findOne({ Username: authorizedUsername });
 
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

module.exports = router;
