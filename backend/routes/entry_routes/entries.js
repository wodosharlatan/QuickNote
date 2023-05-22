const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");

// Add env variables
require("dotenv").config();

// Get All entries
router.get("/", async (req, res) => {
	const entires = await Entry.find();

	const result = entires.map((entires) => {
		// Return only necessary info for each user As JSON
		return {
			ID: entires.ID,
			Urgency: entires.Urgency,
			DeadLine: entires.DeadLine,
			Description: entires.Description,
			Text: entires.Text,
			IsPrivate: entires.IsPrivate,
			AddedBy: entires.AddedBy,
		};
	});

	res.json(result);
});

// Get Entry by ID
router.get("/:ID", async (req, res) => {
	try {
		const oneEntry = await Entry.findOne({ ID: req.params.ID });

		const json = {
			ID: oneEntry.ID,
			Urgency: oneEntry.Urgency,
			DeadLine: oneEntry.DeadLine,
			Description: oneEntry.Description,
			Text: oneEntry.Text,
			IsPrivate: oneEntry.IsPrivate,
			AddedBy: oneEntry.AddedBy,
		};

		res.json(json);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
