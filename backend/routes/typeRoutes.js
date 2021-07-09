const express = require("express");
const router = express.Router();
const app = express(); // ez lehet, csak a teszt alatt kell
app.use(express.json()); //ez lehet, csak a teszt alatt kell.
const TypeController = require("../controllers/typeControllers");

// test
router.get("/ping", TypeController.testFunct);

// new Type
router.post("/newType", TypeController.newTypeFunct);

// ask all Types
router.get("/allTypes", TypeController.findAllTypes);

module.exports = router;
