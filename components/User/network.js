const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");
const auth = require("../../middleware/auth");

router.post("/register", async function (req, res) {
	const { name, password } = req.body;
	controller
		.addUser(name, password)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(error => {
			response.error(req, res, error, 500);
		});
});

router.post("/login", async (req, res) => {
	const { name, password } = req.body;
	controller
		.login(name, password)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(error => {
			response.error(req, res, error, 500);
		});
});

router.post("/home", auth, async (req, res) => {
	response.success(req, res, "Welcome", 200);
});

// ...

// router.post("/", function (req, res) {
// 	controller
// 		.addUser(req.body.name)
// 		.then(() => {
// 			response.success(req, res, "Create suscessfully", 201);
// 		})
// 		.catch(e => {
// 			response.error(req, res, "Unexpected Error", 500);
// 		});
// });

router.get("/", function (req, res) {
	const { name, userId } = req.body;
	controller
		.getUser(name, userId)
		.then(data => {
			response.success(req, res, data, 200);
		})
		.catch(error => {
			response.error(req, res, error, 500);
		});
});

module.exports = router;
