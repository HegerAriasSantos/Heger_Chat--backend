const express = require("express");
const app = express();
const serve = require("http").Server(app);
const cors = require("cors");
const router = require("./network/routes");
const db = require("./db");
require("dotenv").config({ path: ".env" });
const { socket, connect } = require("./socket");
db.connect(
	process.env.DB_CONNECT ||
		"mongodb+srv://Admin:astrolopitecus@cluster0.ldqms.mongodb.net/Chat_2V?retryWrites=true&w=majority",
);
connect(serve);
const { userJoin, userLeave, getRoomUsers } = require("./utils/Users");
app.set("port", process.env.PORT || 3080);

app.use(
	express.json({
		type: "application/json",
	}),
);
app.use(cors());

router(app);
serve.listen(app.get("port"), function () {
	// console.log(
	// 	`la aplicacion esta funcionado en http://localhost:${app.get("port")}`,
	// );
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

	socket.on("disconnecting ", () => {
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
	});
});
