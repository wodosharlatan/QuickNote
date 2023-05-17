const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const axios = require("axios");

// Add env variables
require("dotenv").config();

// Make new user
router.post("/", async (req, res) => {

	let newID = 0;

	// Generate new ID
	await axios
		.get(`http://localhost:${process.env.PORT}/accounts`)
		.then((response) => {
			const ID_List = [];

			// Get all the current user id's
			for (let i = 0; i < response.data.length; i++) {
				ID_List.push(response.data[i].ID);
			}

			// check if the new id is already in the database
			while (ID_List.includes(newID.toString())) {
				newID++;
			}

			newID = newID.toString();
		});

	// Create new user
	const user = new User({
		Username: req.body.username,
		Password: req.body.password,
		ID: newID,
	});

	try {
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

// Get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

// Get a specific user by Email
router.get("/:ID", async (req, res) => {
	try {
		const validatedUser = await User.findOne({ ID: req.params.ID });

		res.send(validatedUser);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
