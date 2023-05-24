// Add env variables
require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const https = require("https");
const fs = require("fs");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoute = require("./routes/user_routes/user");
const loginRoute = require("./routes/user_routes/login");
const newUserRoute = require("./routes/user_routes/new-user");
const logoutRoute = require("./routes/user_routes/logout");
const tokenRoute = require("./routes/user_routes/tokens");

const entryRoute = require("./routes/entry_routes/new-entry");
const deleteEntryRoute = require("./routes/entry_routes/delete");
const entriesRoute = require("./routes/entry_routes/entries");

// Sites
app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/new-user", newUserRoute);
app.use("/logout", logoutRoute);
app.use("/tokens", tokenRoute);

app.use("/new-entry", entryRoute);
app.use("/delete-entry", deleteEntryRoute);
app.use("/entries", entriesRoute);

app.use("*", (req, res) => {
	res.send("404 Not Found");
});

/* SECURE SERVER


// Start server
https
	.createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
		{
			key: fs.readFileSync("key.pem"),
			cert: fs.readFileSync("cert.pem"),
		}
	)
	.app.listen(PORT, HOST, () => {
		console.log(`Backend server is running on http://${HOST}:${PORT} !`);
	});

*/

app.listen(PORT, HOST, () => {
	console.log(`Backend server is running on http://${HOST}:${PORT} !`);
});

// Connect to MongoDB
mongoose
	.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
	.then(async () => {
		console.log("Connected to MongoDB !");
		// Create admin if doesn't exist exists
		const User = require("./models/user_model");
		if (await User.findOne({ Username: 'admin' }) !== null)
			return;

		const saltedSha256 = require("salted-sha256");
	
		await new User({
			Username: "admin",
			Password: saltedSha256("admin", "SALT"),
			IsAdmin: true
		}).save();
	}
	)
	.catch((err) => console.log(err));
