const Model = require("./model");

function addMessage(message) {
	const myMessage = new Model(message);
	myMessage.save();
}
function getMessage(userId = null, messageId = null, chatId = null) {
	return new Promise((resolve, reject) => {
		let filter = {};
		if (userId !== null) {
			filter["user"] = userId;
		}
		if (userId !== null) {
			filter["_id"] = userId;
		}
		if (chatId !== null) {
			filter["chat"] = chatId;
		}
		Model.find(filter)
			.populate("User")
			.populate("Chat")
			.exec((error, populatedData) => {
				if (error) {
					reject(error);
					return false;
				}
				resolve(populatedData);
			});
	});
}
async function updateText(id, message) {
	const foundMessage = await Model.findById(id);
	foundMessage.message = message;
	foundMessage.date = new Date();

	const newMessage = await foundMessage.save();
	return newMessage;
}
async function deleteMessage(id) {
	return Model.deleteOne({
		_id: id,
	});
}

module.exports = {
	add: addMessage,
	list: getMessage,
	update: updateText,
	delete: deleteMessage,
};
