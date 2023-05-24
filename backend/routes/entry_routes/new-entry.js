const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");
const User = require("../../models/user_model");
const { AuthenticateUser } = require("../../functions");

// Add env variables
require("dotenv").config();

async function generateID() {
	let newID = 0;

	const entries = await Entry.find();

	// get all the ids
	const result = entries.map((entry) => {
		return entry.ID;
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
	let addedby = "";

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
			return;
		}
	} catch (error) {
		res.json({ message: error.toString() });
		return;
	}

	// Check if the deadline is in the past
	const deadline = new Date(req.body.deadline);
	const today = new Date();

	const urgency = req.body.urgency;
	const textlength = req.body.text.trim().length;
	const titlelength = req.body.title.trim().length;

	// Check if the text and title are between 10 and 1000 characters
	if (textlength < 10 || textlength > 1000) {
		res.json({ message: "Text must be between 10 and 1000 characters" });
		return;
	}

	if (titlelength < 5 || titlelength > 50) {
		res.json({ message: "Title must be between 5 and 50 characters" });
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

	const title = req.body.title.trim();
	const text = req.body.text.trim();
	const ispublic = req.body.ispublic.trim();

	// Create new Entry
	const entry = new Entry({
		ID: await generateID(),
		Urgency: urgency,
		DeadLine: deadline,
		Title: title,
		Text: text,
		IsPublic: ispublic,
		AddedBy: addedby,
	});

	try {
		await entry.save();
		res.json({ message: "Entry successfully created" });
		return;
	} catch (err) {
		res.json({ message: err.toString() });
		return;
	}
});

module.exports = router;
