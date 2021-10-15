const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");
const path = require("path");
const auth = require("../../middleware/auth");

router.get("/", function (req, res) {
	const filterUser = req.query.userId || null;
	const filterId = req.query.messageId || null;
	const filterChat = req.query.chatId || null;
	controller
		.getMessages(filterUser, filterId, filterChat)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});
router.post("/", auth, function (req, res) {
	const { chatId, userId, message, file, name } = req.body;
	controller
		.addMessage(chatId, userId, message, file, name)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});
router.patch("/:id", function (req, res) {
	controller
		.updateMessage(req.params.id, req.body.message)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});
router.delete("/:id", function (req, res) {
	controller
		.deleteMessage(req.params.id)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});

module.exports = router;
