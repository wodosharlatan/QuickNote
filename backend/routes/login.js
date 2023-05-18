const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/user_model");

function generateToken() {
	token =
		Math.random().toString(36).slice(2) +
		Math.random().toString(36).toUpperCase().slice(2);

	return token;
}

router.post("/", async (req, res) => {
	// Get all users and check if the input username and password match
	try {
		const response = await axios.get(
			`http://localhost:${process.env.PORT}/users`
		);
		const inputUsername = req.body.username;
		const inputPassword = req.body.password;
		const result = response.data.filter(
			(user) =>
				user.Username === inputUsername && user.Password === inputPassword
		);

		if (result.length === 1) {
			// Update last login
			await axios.patch(
				`http://localhost:${process.env.PORT}/users/${result[0].ID}/ChangeLogin`
			);

			// Update token
			await User.updateMany(
				{ ID: result[0].ID },
				{ $set: { UserToken: generateToken() } }
			);

			// Get updated info
			await axios
				.get(
					`http://localhost:${process.env.PORT}/users/${result[0].ID}`
				)
				.then((response) => {
					// Send response as JSON
					res.json({
						token: `${response.data.UserToken}`,
						isadmin: `${response.data.IsAdmin}`,
						changepass: `${response.data.FirstTimeLogin}`,
					});
				});
		} else {
			res.json({ message: "Wrong username or password!" });
		}
	} catch (error) {
		console.log(error);
		res.json({ message: error.toString() });
	}
});

module.exports = router;
