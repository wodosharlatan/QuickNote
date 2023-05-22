const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const https = require("https");
const fs = require("fs");

// Add env variables
require("dotenv").config();

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
const deleteEntryRoute = require("./routes/entry_routes/delete")

// Sites
app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/new-user", newUserRoute);
app.use("/logout", logoutRoute);
app.use("/tokens", tokenRoute);

app.use("/new-entry", entryRoute);
app.use("/delete-entry", deleteEntryRoute);


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
