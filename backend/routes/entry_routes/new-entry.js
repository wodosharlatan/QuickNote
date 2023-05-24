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
	console.log(newID);
	return newID;
}

// Make new Entry
router.post("/", async (req, res) => {
	// Check if user exists
	let validateUsername = "";

	try {
		if ((await AuthenticateUser(req.body.token)) === false) {
			res.json({ message: "Unauthorized" });
			return;
		}

		const oneUser = await User.findOne({ Username: req.body.addedby });

		if (oneUser.Username === req.body.addedby) {
			validateUsername = oneUser.Username;
		} else {
			res.json({ message: "User does not exist" });
			return;
		}
	} catch (error) {
		res.json({ message: error.toString() });
		return;
	}

	try {
		// Check if the deadline is in the past
		const deadline = req.body.deadLine;
		const [deadline_day, deadline_month, deadline_year] = deadline.split(".");

		const formattedDealine = `${deadline_year}-${deadline_month}-${deadline_day}`;

		const currentDate = new Date();
		const current_year = currentDate.getFullYear();
		const current_month = String(currentDate.getMonth() + 1).padStart(2, "0");
		const current_day = String(currentDate.getDate()).padStart(2, "0");

		const formattedDate = `${current_year}-${current_month}-${current_day}`;

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
		if (formattedDealine < formattedDate) {
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
			DeadLine: new Date(formattedDealine),
			Title: title,
			Text: text,
			IsPublic: ispublic,
			AddedBy: validateUsername,
		});

		await entry.save();
		res.json({ message: "Entry successfully created" });
		return;
	} catch (err) {
		res.json({ message: err.toString() });
		return;
	}
});

module.exports = router;
