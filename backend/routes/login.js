const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
	result = [];

	// Get all users
	await axios
		.get(`http://localhost:${process.env.PORT}/users`)
		.then((response) => {
			const inputUsername = req.body.username;
			const inputPassword = req.body.password;

			for (let i = 0; i < response.data.length; i++) {
				if (
					inputUsername == response.data[i].Username &&
					inputPassword == response.data[i].Password
				) {
					result.push(response.data[i]);
				}
			}
		});

	if (result.length == 1) {
		console.log(result[0].ID);
		await axios
			.patch(
				`http://localhost:${process.env.PORT}/users/${result[0].ID}/ChangeLogin`
			)
			.then((response) => {
				res.json(result[0]);
			});
	}
});

module.exports = router;
