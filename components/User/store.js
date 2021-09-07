const Model = require("./model");

function addUser(User) {
	const myUser = new Model(User);
	return myUser.save();
}
async function getUser(name) {
	const users = await Model.findOne({ name });
	return users;
}

module.exports = {
	add: addUser,
	list: getUser,
	// update: updateText,
	// delete: deleteUser,
};
