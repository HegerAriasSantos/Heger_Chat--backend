const { socket } = require("../../socket");
const store = require("./store");

function addMessage(chatId, userId, message, file, name, fileName, fileType) {
	return new Promise((resolve, reject) => {
		if (!chatId || !userId) {
			console.error("Faltan datos");
			reject("Datos incorrectos");
			return false;
		}

		let fullMessage = {
			name,
			chatId,
			userId,
			message,
			file,
			fileName,
			fileType,
			date: new Date(),
		};

		socket.io.to(chatId).emit("sentMessage", fullMessage);
		store.add(fullMessage);
		resolve(fullMessage);
	});
}
function getMessages(userId = null, messageId = null, chatId = null) {
	return new Promise((resolve, reject) => {
		const messages = store.list(userId, messageId, chatId);
		if (!messages) {
			reject("No hay mensajes disponibles");
			return false;
		}
		resolve(messages);
	});
}
function getImages(userId = null) {
	return new Promise((resolve, reject) => {
		const Images = store.listImages(chatId);
		if (!Images) {
			reject("No hay mensajes disponibles");
			return false;
		}
		resolve(Images);
	});
}
async function updateMessage(id, message) {
	return new Promise(async (resolve, reject) => {
		if (!id || !message) {
			reject("Invalid data");
			return false;
		}
		const response = await store.update(id, message);
		resolve(response);
	});
}

async function deleteMessage(id) {
	return new Promise(async (resolve, reject) => {
		const response = await store.delete(id);
		if (!response) {
			reject("There's not message");
		}
		resolve(response);
	});
}

module.exports = {
	addMessage,
	getMessages,
	updateMessage,
	deleteMessage,
};
