const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../../models/user_model");
const saltedSha256 = require("salted-sha256");

// Add env variables
require("dotenv").config();

// Get all names and passwords of users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();

		const result = users.map((user) => {
			// Return only necessary info for each user As JSON
			return {
				Username: user.Username,
				Password: user.Password,
			};
		});

		res.json(result);
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

router.post("/", async (req, res) => {
	// Get all names and passwords of users
	authorizedUsername = await axios
		.get(`http://localhost:${process.env.PORT}/login`)
		.then((response) => {
			// Check if the input username and password match any in the database
			const result = response.data.filter(
				(user) =>
					user.Username === req.body.username &&
					user.Password === saltedSha256(`${req.body.password}`, "SUPER-SALT")
			);

			return result[0].Username;
		})
		.catch((error) => {
			console.log(error);
		});

	// Generate Token
	await axios
		.patch(`http://localhost:${process.env.PORT}/tokens/${authorizedUsername}`)
		.catch((error) => {
			console.log(error);
		});

	// Get and return updated info
	await axios
		.get(`http://localhost:${process.env.PORT}/users/${authorizedUsername}`)
		.then(async (response) => {
			// Send response as JSON
			const json = {
				token: `${response.data.UserToken}`,
				isAdmin: `${response.data.IsAdmin}`,
				ShouldChangePassword: `${response.data.FirstTimeLogin}`,
			};

			// Update last login
			await axios
				.patch(
					`http://localhost:${process.env.PORT}/tokens/${json.token}/ChangeLastLogin`
				)
				.then(() => {
					res.json(json);
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;
