const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");

// Add env variables
require("dotenv").config();

// Delete Entry by ID
router.post("/", async (req, res) => {
	try {
		await Entry.deleteOne({ ID: req.body.id });
		res.json({ message: "Entry deleted !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
