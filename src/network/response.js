exports.success = function (req, res, message, status) {
	res.status(status).send({
		Headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
			"Access-Control-Allow-Headers":
				"Origin, X-Requested-With, Content-Type, Accept",
		},
		error: "",
		body: message,
	});
};
exports.error = function (req, res, message, status) {
	res.status(status).send({
		error: message,
		body: "",
	});
};
