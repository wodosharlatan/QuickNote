const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");

// Add env variables
require("dotenv").config();

// Make new user
router.post("/", async (req, res) => {

	// Create new user
	const entry = new Entry({
        Urgency: req.body.urgency,
		DeadLine: req.body.deadline,
		Description: req.body.description,
        Text: req.body.text,
        Public: req.body.public,
        AddedBy: req.body.addedby
	});

	try {
		await entry.save();
		res.json({ message:"Entry successfully created"});
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

module.exports = router;