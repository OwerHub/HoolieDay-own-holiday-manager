const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/ping", userController.testFunct);

//new user
router.post("/newUser", userController.newUser);
//ask user by sub

//ask all user

module.exports = router;
