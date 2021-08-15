const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/ping", userController.testFunct);

//--- USERS
//new user
router.post("/newUser", userController.newUser);

//ask user by sthg
router.get("/searchuser", userController.searchUser);

//update User
router.put("/updateUser", userController.updateUser);

// delete user
router.delete("/deleteUser", userController.deleteUser);

//--- HOLYDAYS

// post new holyday
router.post("/newholyday", userController.newHolyday);

// update holyday's stuf
router.put("/updateHolyday", userController.updateHolyday);

// delete holyday
router.delete("/holyday", userController.deleteHolyday);

//--- TYPES

// new type
router.get("/newType", userController.newPersonType);

// update Type
router.put("/updateType", userController.updateType);

// delete Type
router.delete("/deleteType", userController.deleteType);

module.exports = router;
