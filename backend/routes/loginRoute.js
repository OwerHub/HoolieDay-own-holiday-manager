const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/ping", loginController.testFunct);

router.post("/sendLoginCode", loginController.postCatchLoginCode);

module.exports = router;