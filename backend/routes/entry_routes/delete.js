const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");
const User = require("../../models/user_model");
const { AuthenticateUser } = require("../../functions");

// Add env variables
require("dotenv").config();

// Delete Entry by ID
router.post("/:ID", async (req, res) => {
	try {
		if ((await AuthenticateUser(req.body.token)) === false) {
			res.json({ message: "Unauthorized" });
			return;
		}

		const entry = await Entry.findOne({ ID: req.params.ID });

		if (!entry) {
			res.json({ message: "Entry not found" });
			return;
		}

		const oneUser = await User.findOne({ UserToken: req.body.token });
		Username = oneUser.Username;

		// check if entry is private
		if (entry.IsPublic === true) {
			await Entry.deleteOne({ ID: req.params.ID });
			res.json({ message: "Entry deleted !" });
			return;
		}

		// check if user is the owner of the entry
		if (entry.AddedBy !== Username) {
			res.json({ message: "Not authorized to delete this entry" });
			return;
		}

		await Entry.deleteOne({ ID: req.params.ID });
		res.json({ message: "Entry deleted !" });
		return;
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
