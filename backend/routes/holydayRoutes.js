const express = require("express");
const router = express.Router();

const verify = require("../middlewares/tryMiddle");

const app = express(); // ez lehet, csak a teszt alatt kell
app.use(express.json()); //ez lehet, csak a teszt alatt kell.
const HolydayController = require("../controllers/holydaysController");

// test
router.get("/ping", (req, res) => {
  res.send("Holyday");
});

// Ask All Holyday
router.get("/allHolyday", verify, HolydayController.findAllHolydays);

// add HOlday
router.post("/newHolyday", HolydayController.newHolydayFunct);

// delete Holyday
router.delete("/deleteHolyday", HolydayController.deleteHolyday);

// modify Holyday

// save one Holyday for Google Calendar

module.exports = router;
