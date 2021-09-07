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

socket.io.on("connection", Socket => {
	console.log("New client connected");
});
