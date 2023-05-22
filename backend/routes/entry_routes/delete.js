const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");

// Add env variables
require("dotenv").config();

// Make new user
router.delete("/", async (req, res) => {
    res.json({message: "ola amigos"});
});

module.exports = router;