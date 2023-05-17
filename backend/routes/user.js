const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const axios = require("axios");

// Add env variables
require("dotenv").config();

// Make new user
router.post("/", async (req, res) => {

	// Generate new ID
	const currentID = await axios.get(`http://localhost:${process.env.PORT}/accounts`);

	const ID_List = [];

	// Get all the current user id's
	for (let i = 0; i < currentID.data.length; i++) {
		ID_List.push(currentID.data[i].ID);
	}

	// check if the new id is already in the database
	let newID = 0;
	while (ID_List.includes(newID.toString())) {
		newID++;
	}

	newID = newID.toString();

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
router.get("/:Email", async (req, res) => {
	try {
		const validatedUser = await User.findOne({ Email: req.params.Email });

		res.send(validatedUser);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
