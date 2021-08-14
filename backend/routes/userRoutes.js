const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/ping", userController.testFunct);

//new user
router.post("/newUser", userController.newUser);

//ask user by sthg
router.get("/searchuser", userController.searchUser);

//ask all user

// post new holyday
router.post("/newholyday", userController.newHolyday);

// delete holyday
router.delete("/holyday", userController.deleteHolyday);

module.exports = router;
