const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const axios = require("axios");

// Add env variables
require("dotenv").config();


// Generate new ID
async function generateID() {
	let newID = 0;
	const response = await axios.get(
		`http://localhost:${process.env.PORT}/users`
	);
	const ID_List = response.data.map((user) => user.ID);

	while (ID_List.includes(newID.toString())) {
		newID++;
	}

	return newID.toString();
}


// Generate random password
function generatePassword() {
	pass =
		Math.random().toString(36).slice(2) +
		Math.random().toString(36).toUpperCase().slice(2);

	pass = pass.slice(0, 8);

	return pass;
}


// Make new user
router.post("/", async (req, res) => {
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
			{ $set: { Password: req.body.password, FirstTimeLogin: false } }
		);
		res.json(updatedUser);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Change Last Login for a specific user by ID
router.patch("/:ID/ChangeLogin", async (req, res) => {
	try {
		const updatedUser = await User.updateMany(
			{ ID: req.params.ID },
			{ $set: { LastLogin: Date.now() } }
		);
		res.json(updatedUser);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});


// Delete token for a specific user by ID on logout
router.patch("/:ID/LogOut", async (req, res) => {
	try {
		const updatedUser = await User.updateMany(
			{ ID: req.params.ID },
			{ $set: { UserToken: "" } }
		);
		res.json(updatedUser);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Delete a specific user by ID
router.delete("/:ID", async (req, res) => {
	try {
		const removedUser = await User.deleteOne({ ID: req.params.ID });
		res.json(removedUser);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
