const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();
const saltedSha256 = require("salted-sha256");
const { AuthenticateUser, AuthenticateAdmin } = require("../../functions");

// Add env variables
require("dotenv").config();

// Change Password for a specific user by Token
router.patch("/change-password", async (req, res) => {
	try {
		if (!(await AuthenticateUser(req.body.token))) {
			res.json({ message: "Unauthorized" });
			return;
		}

		await User.updateMany(
			{ UserToken: req.body.username },
			{
				$set: {
					Password: saltedSha256(`${req.body.password}`, "SUPER-SALT"),
					FirstTimeLogin: false,
				},
			}
		);
		res.json({ message: "Password changed !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Make user Admin
router.patch("/admin", async (req, res) => {
	try {
		if (!(await AuthenticateAdmin(req.body.token))) {
			res.json({ message: "Unauthorized" });
			return;
		}

		await User.updateMany(
			{ UserToken: req.body.username },
			{ $set: { IsAdmin: true } }
		);
		res.json({ message: "Admin privileges granted !" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
