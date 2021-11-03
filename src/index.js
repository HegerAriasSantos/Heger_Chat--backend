const express = require("express");
const app = express();
const serve = require("http").Server(app);
const cors = require("cors");
const router = require("./network/routes");
const db = require("./db");
require("dotenv").config({ path: ".env" });
const { socket, connect } = require("./socket");
db.connect(process.env.DB_CONNECT);
connect(serve);
const { userJoin, getRoomUsers } = require("./Utils/Users");
app.set("port", process.env.PORT);

app.use(
	express.json({
		type: "application/json",
	}),
);
app.use(cors());

router(app);
serve.listen(app.get("port"), function () {
	console.log(
		`la aplicacion esta funcionado en http://localhost:${app.get("port")}`,
	);
});

socket.io.on("connection", socket => {
	socket.on("joinRoom", ({ name, room }) => {
		const rooms = socket.rooms;
		rooms.forEach(project => socket.leave(project));
		const user = userJoin(socket.id, name, room);
		socket.join(user.room);

		console.log("estoy dentro de : ", socket.rooms);

		let fullMessage = {
			name: "Admin",
			chatId: room,
			message: `${user.name} has joined the chat`,
		};

		socket.to(user.room).emit("sentMessage", fullMessage);
		socket.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});
});
