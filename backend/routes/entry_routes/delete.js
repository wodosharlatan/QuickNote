const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");
const { AuthenticateUser } = require("../../functions");

// Add env variables
require("dotenv").config();

// Delete Entry by ID
router.post("/", async (req, res) => {
	try {
		if ((await AuthenticateUser(req.body.token)) === false) {
			res.json({ message: "Unauthorized" });
			return;
		}

		await Entry.deleteOne({ ID: req.body.id });
		res.json({ message: "Entry deleted !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
