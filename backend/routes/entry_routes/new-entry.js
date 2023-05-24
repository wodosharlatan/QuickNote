const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");
const axios = require("axios");
const { AuthenticateUser } = require("../../functions");

// Add env variables
require("dotenv").config();

async function generateID() {
	let newID = 0;

	const entires = await Entry.find();

	// get all the id's
	const result = entires.map((entires) => {
		return {
			ID: entires.ID,
		};
	});

	// check if the new id is already in the database
	while (result.includes(newID)) {
		newID++;
	}

	return newID;
}

// Make new Entry
router.post("/", async (req, res) => {
	
	// Check if user exists
	const addedby = "";

	try {
		if ((await AuthenticateUser(req.body.token)) === false) {
			res.json({ message: "Unauthorized" });
			return;
		}

		const oneUser = await User.findOne({ Username: req.body.username });

		if (oneUser.Username === req.body.username) {
			addedby = oneUser.Username;
		} else {
			res.json({ message: "User does not exist" });
		}
	} catch (error) {
		res.json({ message: error.toString() });
	}

	// Check if the deadline is in the past
	const deadline = new Date(req.body.deadline);
	const today = new Date();

	const urgency = req.body.urgency;
	const textlength = req.body.text.trim().length;
	const descriptionlength = req.body.description.trim().length;

	// Check if the text and description are between 10 and 1000 characters
	if (textlength < 10 || textlength > 1000) {
		res.json({ message: "Text must be between 10 and 1000 characters" });
		return;
	}

	if (descriptionlength < 5 || descriptionlength > 50) {
		res.json({ message: "Description must be between 5 and 50 characters" });
		return;
	}

	// check if urgency is a number between 1 and 3
	if (urgency < 1 || urgency > 3) {
		res.json({ message: "Urgency must be a number between 1 and 3" });
		return;
	}

	// Check if the deadline is in the past
	if (deadline < today) {
		res.json({ message: "Deadline is in the past" });
		return;
	}

	// Create new Entry
	const entry = new Entry({
		ID: await generateID(),
		Urgency: urgency,
		DeadLine: deadline,
		Description: req.body.description.trim(),
		Text: req.body.text.trim(),
		IsPrivate: req.body.isprivate,
		AddedBy: addedby,
	});

	try {
		await entry.save();
		res.json({ message: "Entry successfully created" });
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

module.exports = router;
