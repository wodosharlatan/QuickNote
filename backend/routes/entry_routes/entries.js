const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");

// Add env variables
require("dotenv").config();

// Get All Public entries
router.get("/", async (req, res) => {
	const entires = await Entry.find();

	const result = entires.map((entires) => {
		// Return only necessary info for each entry As JSON

		if (entires.IsPrivate) {
			return;
		}

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

	const sortedResult = result.sort(
		(a, b) => new Date(a.DeadLine) - new Date(b.DeadLine)
	);

	res.json(sortedResult);
});

// Get All Private entries
router.post("/", async (req, res) => {

	if (!req.body.token) {
		res.json({ message: "Unauthorized" });
		return;
	}

	const oneUser = await User.findOne({ Username: req.body.username });

	const entires = await Entry.find();

	const result = entires.map((entires) => {
		// Return only necessary info for each entry As JSON
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

	const sortedResult = result.sort(
		(a, b) => new Date(a.DeadLine) - new Date(b.DeadLine)
	);

	res.json(sortedResult);
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
