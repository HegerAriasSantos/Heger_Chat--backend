const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mySchema = new Schema({
	userId: {
		type: Schema.ObjectId,
		ref: "User",
	},
	chatId: {
		type: Schema.ObjectId,
		ref: "Chat",
	},
	message: {
		type: String,
		require: true,
	},
	name: String,
	file: String,
	date: Date,
	fileType: String,
	fileName: String,
});

const model = mongoose.model("Message", mySchema);
module.exports = model;
