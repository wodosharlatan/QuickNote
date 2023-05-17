const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	Username: {
		type: String,
		required: true,
	},
	Password: {
		type: String,
		required: true,
	},
	ID: {
		type: String,
		required: true,
	},
	IsAdmin: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Users", userSchema);