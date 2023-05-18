const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
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
					res.json(response.data[i]);
					return;
				}
			}
		});

	res.json({ message: "Invalid username or password" });
});

module.exports = router;
