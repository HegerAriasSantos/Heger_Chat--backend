const Model = require("./model");

function addUser(User) {
	const myUser = new Model(User);
	return myUser.save();
}
async function getUser(name) {
	const users = await Model.findOne({ name });
	return users;
}

async function updateUser(name, lastRoom, newRooms) {
	const foundUser = await Model.findOne({ name });
	console.log(foundUser);
	foundUser.lastRoom = lastRoom;
	foundUser.Rooms = [...foundUser.Rooms, ...newRooms];
	return await foundUser.save();
}
async function updateUserName(name, newName) {
	const foundUser = await Model.findOne({ name }).then(data => {
		console.log(data);
	});
	console.log(foundUser);
	foundUser.name = newName;
	return await foundUser.save();
}
async function deleteUser(_id) {
	return Model.deleteOne({ _id });
}

module.exports = {
	add: addUser,
	list: getUser,
	update: updateUser,
	delete: deleteUser,
	updateName: updateUserName,
};
