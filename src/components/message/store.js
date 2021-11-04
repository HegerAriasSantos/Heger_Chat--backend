const Model = require("./model");

function addMessage(message) {
	const myMessage = new Model(message);
	myMessage.save();
}
function getMessage(
	userId = null,
	messageId = null,
	chatId = null,
	image = null,
) {
	return new Promise((resolve, reject) => {
		let filter = {};
		if (userId !== null) {
			filter["user"] = userId;
		}
		if (chatId !== null) {
			filter["chatId"] = chatId;
		}
		if (image !== null) {
			filter["fileType"] = "image";
			resolve(Model.find(filter));
		}
		if (messageId !== null) {
			filter["_id"] = messageId;
		}

		resolve(Model.find(filter));
	});
}
function listImages(chatId = null) {
	return new Promise((resolve, reject) => {
		let filter = {
			chatId,
			fileType: "image",
		};
		resolve(Model.find(filter));
	});
}

async function updateText(id, message) {
	const foundMessage = await Model.findById(id);
	foundMessage.message = message;
	foundMessage.date = new Date();

	const newMessage = await foundMessage.save();
	return newMessage;
}
async function deleteMessage(_id) {
	return Model.deleteOne({ _id });
}

module.exports = {
	add: addMessage,
	list: getMessage,
	update: updateText,
	delete: deleteMessage,
};
