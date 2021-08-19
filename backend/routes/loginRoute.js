const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const verify = require("../middlewares/tryMiddle");

router.get("/ping", loginController.testFunct);

router.post("/sendLoginCode", loginController.postCatchLoginCode);

router.put("/updateUserData", verify, loginController.updateUserKey);

module.exports = router;
