const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const axios = require("axios");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();
const saltedSha256 = require("salted-sha256");

// Add env variables
require("dotenv").config();

// Make new user
router.post("/", async (req, res) => {

	// Get all usernames
	nameList = [];

	await axios
		.get(`http://localhost:${process.env.PORT}/users`)
		.then((response) => {
			for (let i = 0; i < response.data.length; i++) {
				nameList.push(response.data[i].Username);
			}
		})
		.catch((error) => {
			console.log(error);
		});

	// Check if username already exists
	if (nameList.includes(req.body.username)) {
		res.json({ message: "Username already exists!" });
		return;
	}

	const uid = await uidgen.generate();

	// Create new user
	const user = new User({
		Username: req.body.username,
		Password: saltedSha256(`${uid}`, 'SUPER-SALT'),
	});


	try {
		await user.save();
		res.json({ message: "User created with temporary password: " + uid + " . Please change your password after logging in "});
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

module.exports = router;