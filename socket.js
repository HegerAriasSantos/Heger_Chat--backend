const { Server } = require("socket.io");
const socket = {};
function connect(server) {
	socket.io = new Server(server, {
		cors: {
			origin: [""],
			handlePrefligthRequest: (req, res) => {
				res.writeHead(200, {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,POST",
					"Access-Control-Allow-Headers": "my-custom-header",
					"Access-Control-Allow-Credentials": true,
				});
				res.end();
			},
		},
	});
}

module.exports = {
	connect,
	socket,
};
