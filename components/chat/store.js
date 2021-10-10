const Model = require("./model");

function addChat(chat) {
	const newChat = new Model(chat);
	return newChat.save();
}

function listChats() {
	return Model.find();
}
function updateChat(name, newName) {
	let foundChat = Model.findOne({ name });
	foundChat.name = newName;
	return foundChat.save();
}

module.exports = {
	add: addChat,
	list: listChats,
	update: updateChat,
};
