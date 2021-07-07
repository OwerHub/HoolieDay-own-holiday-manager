const express = require("express");
const router = express.Router();
const app = express(); // ez lehet, csak a teszt alatt kell
app.use(express.json()); //ez lehet, csak a teszt alatt kell.
const HolydayController = require("../controllers/holydaysController");

// test
router.get("/ping", (req, res) => {
  res.send("Holyday");
});

router.post("/createTry", HolydayController.testFunct);

// Ask All Holyday

// add HOlday

// delete Holyday

// modify Holyday

// save one Holyday for Google Calendar

module.exports = router;
