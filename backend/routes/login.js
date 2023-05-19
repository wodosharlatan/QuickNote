const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/user_model");
const UIDGenerator = require("uid-generator");
const { json } = require("body-parser");
const uidgen = new UIDGenerator();

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
			// Check if the input username and password match
			const inputUsername = req.body.username;
			const inputPassword = req.body.password;
			const result = response.data.filter(
				(user) =>
					user.Username === inputUsername && user.Password === inputPassword
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

/* 


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
				{ $set: { UserToken: uidgen.generateSync() } }
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

*/

module.exports = router;
