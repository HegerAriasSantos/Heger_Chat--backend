const store = require("./store");

function addChat(name) {
	if (!name) {
		return Promise.reject(`The chat need a name`);
	}

	const newChat = {
		name,
	};

	return store.add(newChat);
}

function listChats() {
	return new Promise((resolve, reject) => {
		resolve(store.list());
	});
}

function updateChat(name, newName) {
	return new Promise((resolve, reject) => {
		if (!name || !newName) {
			return reject("There's not a name");
		}

		return resolve(store.update(name, newName));
	});
}

module.exports = {
	addChat,
	listChats,
	updateChat,
};
