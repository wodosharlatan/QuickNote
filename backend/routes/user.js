const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const nodemailer = require("nodemailer");

/*
async function SendEmail(username, password, email) {
	const htmlEmail = `
    <h3>Test</h3>
    <ul>
        <li>Username: ${username} </li>
        <li>Password: ${password} </li>
    </ul>
    `;

	const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
		secure: false,
		auth: {
			user: "test@openjavascript.info",
			pass: "NodeMailer123!",
		},
	});

	try {
		await transporter.sendMail({
			from: `OpenJavaScript <test@openjavascript.info>`,
			to: `${email}`,
			subject: "Test",
			html: htmlEmail,
		});
	} catch (error) {
		console.log(error);
	}
}
*/


// Make new user
router.post("/", async (req, res) => {
	const name = req.body.username;
	const pass = req.body.password;
	const email = req.body.email;

	const user = new User({
		Username: name,
		Password: pass,
		Email: email,
	});

	try {
		// SendEmail(name, pass, email);
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
