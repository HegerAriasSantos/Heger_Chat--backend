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
		if (messageId !== null) {
			filter["_id"] = messageId;
		}
		if (chatId !== null) {
			filter["chatId"] = chatId;
		}
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
