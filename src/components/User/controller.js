const store = require("./store");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = process.env;
function addUser(name, password) {
	return new Promise(async (resolve, reject) => {
		if (!(password && name)) {
			return reject("All input is required");
		}
		const oldUser = await store.list(name);

		if (oldUser) {
			return reject("User Already Exist. Please Login");
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const user = await store.add({
			name: name,
			password: encryptedPassword,
		});

		const token = jwt.sign(
			{ userId: user._id, name },
			config.TOKEN_KEY || "Algo raro",
			{
				expiresIn: "2h",
			},
		);
		user.token = token;
		return resolve(user);
	});
}
function login(name, password) {
	return new Promise(async (resolve, reject) => {
		if (!(password && name)) {
			return reject("All input is required");
		}

		const user = await store.list(name);

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user._id, name },
				config.TOKEN_KEY || "Algo raro",
				{
					expiresIn: "2h",
				},
			);
			user.token = token;

			resolve(user);
		}
		reject("Invalid Credentials");
	});
}

function getUser(filterUser = null) {
	return new Promise(async (resolve, reject) => {
		return resolve(store.list(filterUser));
	});
}
function updateUser(id, newUser) {
	return new Promise(async (resolve, reject) => {
		return resolve(store.list(filterUser));
	});
}

module.exports = {
	addUser,
	getUser,
	login,
	updateUser,
};
