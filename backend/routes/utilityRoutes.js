const express = require("express");
const router = express.Router();
const app = express(); // ez lehet, csak a teszt alatt kell
app.use(express.json()); //ez lehet, csak a teszt alatt kell.
const utilController = require("../utility/copyHolydayData");

router.get("/ping", (req, res) => {
  res.send("utils pong");
});

router.get("/copy", utilController.copyFromJson);

module.exports = router;
