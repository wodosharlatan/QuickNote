const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry_model");

// Add env variables
require("dotenv").config();

// Make new user
router.get("/", async (req, res) => {
    const entries = await Entry.find();
    res.json(entries);
});

module.exports = router;