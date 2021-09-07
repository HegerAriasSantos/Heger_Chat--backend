const store = require("./store");

function addChat(users) {
	if (!users || users.length < 2) {
		return Promise.reject(`Invalid amound of users: ${users.length}`);
	}

	const newChat = {
		users: users,
	};

	return store.add(newChat);
}

async function listChats(userId) {
	return new Promise((resolve, reject) => {
		resolve(store.list(userId));
	});
}

module.exports = {
	addChat,
	listChats,
};
