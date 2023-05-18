const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const axios = require("axios");

// Add env variables
require("dotenv").config();

// Make new user
router.post("/", async (req, res) => {
	
	// Generate new ID
	async function generateID() {
		let newID = 0;

		await axios
			.get(`http://localhost:${process.env.PORT}/users`)
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

		return newID;
	}

	// Generate random password
	function generatePassword() {
		pass =
			Math.random().toString(36).slice(2) +
			Math.random().toString(36).toUpperCase().slice(2);

		pass = pass.slice(0, 8);

		return pass;
	}

	// Create new user
	const user = new User({
		Username: req.body.username,
		Password: generatePassword(),
		ID: await generateID(),
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

// Get a specific user by ID
router.get("/:ID", async (req, res) => {
	try {
		const validatedUser = await User.findOne({ ID: req.params.ID });

		res.send(validatedUser);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Change Password for a specific user by ID
router.patch("/:ID", async (req, res) => {
	try {
		const updatedUser = await User.updateMany(
			{ ID: req.params.ID },
			{ $set: { Password: req.body.password , FirstTimeLogin: false }}
		);
		res.json(updatedUser);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
