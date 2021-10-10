const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");
const auth = require("../../middleware/auth");

router.post("/register", (req, res) => {
	const { name, password } = req.body;
	controller
		.addUser(name, password)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});

router.post("/login", (req, res) => {
	const { name, password } = req.body;
	controller
		.login(name, password)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});

router.post("/auth", auth, async (req, res) => {
	response.success(req, res, "Welcome", 200);
});

router.get("/", function (req, res) {
	const { name, userId } = req.body;
	controller
		.getUser(name, userId)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, "Unexpecter error", 500);
		});
});

module.exports = router;
