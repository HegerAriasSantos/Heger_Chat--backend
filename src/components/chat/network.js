const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

router.get("/", function (req, res) {
	const id = req.query.id;
	controller
		.listChats()
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});

router.post("/", function (req, res) {
	controller
		.addChat(req.body.name)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});
router.patch("/", function (req, res) {
	controller
		.updateChat(req.body.name)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});

module.exports = router;
