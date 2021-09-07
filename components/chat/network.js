const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

router.get("/", function (req, res) {
	controller
		.listChats(req.params.userId)
		.then(chatList => {
			response.success(req, res, chatList, 200);
		})
		.catch(error => {
			response.error(req, res, "Unexpected Error", 500, error);
		});
});

router.post("/", function (req, res) {
	controller
		.addChat(req.body.users)
		.then(newChat => {
			response.success(req, res, newChat, 201);
		})
		.catch(error => {
			response.error(req, resp, "Unexpected error", 500, error);
		});
});

module.exports = router;
