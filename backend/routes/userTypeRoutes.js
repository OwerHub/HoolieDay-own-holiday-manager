const express = require("express");
const router = express.Router();

const UserTypeController = require("../controllers/userTypesController");
const verify = require("../middlewares/tryMiddle");

router.get("/ping", UserTypeController.testFunct);

router.post("/newUserType", verify, UserTypeController.newUserType);

router.get("/allUserTypes", verify, UserTypeController.findAllUserTpyes);

router.put("/updateUserTypes", verify, UserTypeController.updateUserTypes);

router.delete("/deleteUserTypes", verify, UserTypeController.deleteUserType);

module.exports = router;
