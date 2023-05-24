const User = require("./models/user_model");

async function AuthenticateUser(token) {
	try {
		const oneUser = await User.findOne({ UserToken: token });
		return !!oneUser; // Returns true if oneUser exists, false otherwise
	} catch (error) {
		return false;
	}
}

async function AuthenticateAdmin(token) {
	try {
		const oneUser = await User.findOne({ UserToken: token });
		return !!(oneUser && oneUser.IsAdmin); // Returns true if oneUser exists and IsAdmin is true, false otherwise
	} catch (error) {
		return false;
	}
}

module.exports = {
	AuthenticateUser: AuthenticateUser,
	AuthenticateAdmin: AuthenticateAdmin,
};
