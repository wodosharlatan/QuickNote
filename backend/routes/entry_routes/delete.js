const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");

// Add env variables
require("dotenv").config();

// Delete Entry by ID
router.delete("/:ID", async (req, res) => {
	try {
		await Entry.deleteOne({ ID: req.params.ID });
		res.json({ message: "Entry deleted !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
