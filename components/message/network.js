const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: "public/files",
	filename: function (req, file, cb) {
		cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

router.get("/", function (req, res) {
	const filterUser = req.query.userId || null;
	const filterId = req.query.messageId || null;
	const filterChat = req.query.chatId || null;
	controller
		.getMessages(filterUser, filterId, filterChat)
		.then(messageList => {
			response.success(req, res, messageList, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});
router.post("/", upload.single("file"), function (req, res) {
	controller
		.addMessage(req.body.chatId, req.body.userId, req.body.message, req.file)
		.then(() => {
			response.success(req, res, "Enviado correctamente", 200);
		})
		.catch(e => {
			response.error(req, res, "Error inesperado", 500);
		});
});
router.patch("/:id", function (req, res) {
	controller
		.updateMessage(req.params.id, req.body.message)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Error interno", 500);
		});
});
router.delete("/:id", function (req, res) {
	controller
		.deleteMessage(req.params.id)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Invalid data", 500);
		});
});

module.exports = router;
