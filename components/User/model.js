const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mySchema = new Schema({
	name: String,
	password: String,
	token: String,
	lastRoom: String,
	Rooms: [],
});

const model = mongoose.model("User", mySchema);
module.exports = model;
