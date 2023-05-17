const express = require("express");
const router = express.Router();
const User = require("../models/user_model");

async function SendEmail() {

    console.log("Sending email...");


}



// Make new user
router.post("/", async (req, res) => {
	const user = new User({
		Username: req.body.username,
		Password: req.body.password,
		Email: req.body.email,
	});

	try {
        SendEmail();
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

// Get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

// Get a specific user by Email
router.get("/:Email", async (req, res) => {
	try {
		const validatedUser = await User.findOne({ Email: req.params.Email });

		res.send(validatedUser);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
