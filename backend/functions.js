const axios = require("axios");
const User = require("./models/user_model");

async function AuthenticateUser(token) {
	try {
		const oneUser = await User.findOne({ UserToken: token });

		if (!oneUser) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		console.log(error);
	}
}

async function AuthenticateAdmin(token) {
	try {
		const oneUser = await User.findOne({ UserToken: token });

		if (oneUser.IsAdmin === false) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = AuthenticateUser, AuthenticateAdmin;
