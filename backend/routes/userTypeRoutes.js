const express = require("express");
const router = express.Router();

const UserTypeController = require("../controllers/userTypesController");
const verify = require("../middlewares/tryMiddle");
// test
router.get("/ping", UserTypeController.testFunct);

// new type
router.post("/newUserType", verify, UserTypeController.newUserType);
// ask all type
router.get("/allUserTypes", verify, UserTypeController.findAllUserTpyes);

// update type
router.put("/updateUserTypes", verify, UserTypeController.updateUserTypes);

// delete type
router.delete("/deleteUserTypes", verify, UserTypeController.deleteUserType);

module.exports = router;
