const express = require("express");
const router = express.Router();

const UserTypeController = require("../controllers/userTypesController");

// test
router.get("/ping", UserTypeController.testFunct);

// new type
router.post("/newUserType", UserTypeController.newUserType);
// ask all type
router.get("/allUserTypes", UserTypeController.findAllUserTpyes);

// update type
router.put("/updateUserTypes", UserTypeController.updateUserTypes);

// delete type
router.delete("/deleteUserTypes", UserTypeController.deleteUserType);

module.exports = router;
