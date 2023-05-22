const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");
const axios = require("axios");

// Add env variables
require("dotenv").config();

// Make new Entry
router.post("/", async (req, res) => {
	async function generateID() {
		let newID = 0;

		await axios
			.get(`http://localhost:${process.env.PORT}/entries`)
			.then((response) => {
				const ID_List = [];

				// Get all the current entry id's
				for (let i = 0; i < response.data.length; i++) {
					ID_List.push(response.data[i].ID);
				}

				// check if the new id is already in the database
				while (ID_List.includes(newID)) {
					newID++;
				}
			});

		return newID;
	}

	const deadline = new Date(req.body.deadline);
	const today = new Date();

	const urgency = req.body.urgency;
	const textlength = req.body.text.trim().length;
	const descriptionlength = req.body.description.trim().length;

	if(textlength < 10 || textlength > 1000){
		res.json({ message: "Text must be between 10 and 1000 characters" });
		return;
	}

	if(descriptionlength < 5 || descriptionlength > 50){
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
		AddedBy: req.body.addedby.trim(),
	});

	try {
		await entry.save();
		res.json({ message: "Entry successfully created" });
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

module.exports = router;
