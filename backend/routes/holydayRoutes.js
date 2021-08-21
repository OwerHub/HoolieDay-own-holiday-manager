const express = require("express");
const router = express.Router();

const verify = require("../middlewares/tryMiddle");

const app = express(); // ez lehet, csak a teszt alatt kell
app.use(express.json()); //ez lehet, csak a teszt alatt kell.
const HolydayController = require("../controllers/holydaysController");

// test
router.get("/ping", (req, res) => {
  res.send("Holyday Pong");
});

//test
router.get("/pong", verify, (req, res) => {
  res.send("verified pong");
});

// Ask All Holyday
router.get("/allHolyday", verify, HolydayController.findAllHolydays);

// add HOlday
router.post("/newHolyday", verify, HolydayController.newHolydayFunct);

// delete Holyday
router.delete("/deleteHolyday", verify, HolydayController.deleteHolyday);

// modify Holyday
router.put("/modifyHolyday", verify, HolydayController.updateHolyday);

// save one Holyday for Google Calendar
router.post("/saveToGoogle", verify, HolydayController.saveToGoogle);

module.exports = router;
