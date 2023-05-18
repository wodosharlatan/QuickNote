const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {

  // Get all users and check if the input username and password match
  try {
    const response = await axios.get(`http://localhost:${process.env.PORT}/users`);
    const inputUsername = req.body.username;
    const inputPassword = req.body.password;
    const result = response.data.filter(user => user.Username === inputUsername && user.Password === inputPassword);

    if (result.length === 1) {
    // Update last login
      await axios.patch(`http://localhost:${process.env.PORT}/users/${result[0].ID}/ChangeLogin`);
      res.json(result[0]);
    } else {
      res.json({});
    }
  } catch (error) {
    res.json({ message: error.toString() });
  }
});

module.exports = router;
