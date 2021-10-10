const express = require("express");
const app = express();
const serve = require("http").Server(app);
const cors = require("cors");
const router = require("./network/routes");
const db = require("./db");
require("dotenv").config({ path: ".env" });
const port = 3080;
const { socket, connect } = require("./socket");
db.connect(process.env.DB_CONNECT);
connect(serve);
const { userJoin, userLeave, getRoomUsers } = require("./utils/Users");
const { list, update } = require("./components/User/store");

app.use(
	express.json({
		type: "application/json",
	}),
);
app.use(cors());

router(app);
serve.listen(port, function () {
	console.log(`la aplicacion esta funcionado en http://localhost:${port}`);
});

socket.io.on("connection", async socket => {
	socket.on("joinRoom", async ({ name, room }) => {
		const UserDB = await list(name);
		const user = userJoin(socket.id, name, room);
		console.log("estoy dentro");
		socket.join(user.room);
		let fullMessage = {
			name: "Admin",
			chatId: room,
			message: `${user.name} has joined the chat`,
		};

		socket.broadcast.to(user.room).emit("sentMessage", fullMessage);

		socket.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getRoomUsers(user.room),
		});
		if (!user.room in UserDB.Rooms) {
			UserDB.Rooms = [...UserDB.Rooms, room];
			await update(name, user.room, UserDB.Rooms);
		}
	});

	socket.on("leaveRoom", () => {
		console.log("out");
		const user = userLeave(socket.id);
		let fullMessage = {
			name: "Admin",
			chatId: user.room,
			message: `${user.name} has left the chat`,
		};
		console.log("funciona");

		if (user) {
			socket.to(user.room).emit("sentMessage", fullMessage);

			// Send users and room info
			socket.to(user.room).emit("roomUsers", {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		}
		update(user.name, user.room);
	});
});
