const express = require("express");
const router = express.Router();
const axios = require("axios");


// Make new user
router.post("/", async (req, res) => {

	const allUsers = axios.get(`http://localhost:${process.env.PORT}/accounts`);
    console.log(allUsers.data);


	
});




module.exports = router;