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

	// Check if the deadline is in the past
	if (deadline < today) {
		res.json({ message: "Deadline is in the past" });
		return;
	} else {
		// Create new Entry
		const entry = new Entry({
			ID: await generateID(),
			Urgency: req.body.urgency,
			DeadLine: req.body.deadline,
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
	}
});

module.exports = router;
