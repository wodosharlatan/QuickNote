const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const axios = require("axios");
const https = require("https");
const fs = require("fs");

// Add env variables
require("dotenv").config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoute = require("./routes/user");
const loginRoute = require("./routes/login");

// Sites
app.use("/users", userRoute);
app.use("/login", loginRoute);

/* SECURE SERVER

// Start server
https
	.createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
		{
			key: fs.readFileSync("key.pem"),
			cert: fs.readFileSync("cert.pem"),
		},
		app
	).listen(port, () => {
	console.log(`Server is running on http://localhost:${port} !`);
});

*/

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port} !`);
});

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
