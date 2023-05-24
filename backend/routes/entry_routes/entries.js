const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");
const User = require("../../models/user_model");
const { AuthenticateUser } = require("../../functions");

// Add env variables
require("dotenv").config();

// Get All Public entries
router.post("/", async (req, res) => {
	if ((await AuthenticateUser(req.body.token)) === false) {
		res.json({ message: "Unauthorized" });
		return;
	}

	const entires = await Entry.find({ IsPublic: true });

	const result = entires.map((entires) => {
		// Return only necessary info for each entry As JSON

		if (entires.IsPublic) {
			return;
		}

		return {
			ID: entires.ID,
			Urgency: entires.Urgency,
			DeadLine: entires.DeadLine,
			Title: entires.Title,
			Text: entires.Text,
			IsPublic: entires.IsPublic,
			AddedBy: entires.AddedBy,
		};
	});

	const sortedResult = result.sort(
		(a, b) => new Date(a.DeadLine) - new Date(b.DeadLine)
	);

	res.json(sortedResult);
});

// Get All Private entries
router.post("/private", async (req, res) => {
	if ((await AuthenticateUser(req.body.token)) === false) {
		res.json({ message: "Unauthorized" });
		return;
	}

	const oneUser = await User.findOne({ UserToken: req.body.token });
	Username = oneUser.Username;

	const entires = await Entry.find({ AddedBy: Username });

	const result = entires.map((entires) => {
		// Return only necessary info for each entry As JSON
		return {
			ID: entires.ID,
			Urgency: entires.Urgency,
			DeadLine: entires.DeadLine,
			Title: entires.Title,
			Text: entires.Text,
			IsPublic: entires.IsPublic,
			AddedBy: entires.AddedBy,
		};
	});

	const sortedResult = result.sort(
		(a, b) => new Date(a.DeadLine) - new Date(b.DeadLine)
	);

	// Check if is private
	const filteredResult = sortedResult.filter((entry) => {
		if (entry.IsPublic === true) {
			return entry;
		}
	});

	res.json(filteredResult);
});

// Get Entry by ID
router.post("/:ID", async (req, res) => {
	try {
		if ((await AuthenticateUser(req.body.token)) === false) {
			res.json({ message: "Unauthorized" });
			return;
		}

		const oneUser = await User.findOne({ UserToken: req.body.token });
		Username = oneUser.Username;

		const oneEntry = await Entry.findOne({ ID: req.params.ID });

		const json = {
			ID: oneEntry.ID,
			Urgency: oneEntry.Urgency,
			DeadLine: oneEntry.DeadLine,
			Title: oneEntry.Title,
			Text: oneEntry.Text,
			IsPublic: oneEntry.IsPublic,
			AddedBy: oneEntry.AddedBy,
		};

		if (json.IsPublic === true) {
			if (json.AddedBy !== oneUser.Username) {
				res.json({ message: "Entry is Private And Doesn't Belong to you" });
				return;
			}
		}

		res.json(json);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
