const express = require("express");
const router = express.Router();

// test
router.get("/ping", (req, res) => {
  res.send("Holyday pong");
});

// Ask All Holyday

// add HOlday

// delete Holyday

// modify Holyday

// save one Holyday for Google Calendar

module.exports = router;
