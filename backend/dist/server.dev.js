"use strict";

var express = require("express");

fs = require("fs");

var cors = require("cors");

var app = express();
var PORT = 8000;
app.use(cors());
app.use(express.json());

var holydays = require("./holydays.json");

app.get("/ping", function (req, res) {
  res.send("pong");
});
app.get("/allDay", function (req, res) {
  res.send(holydays);
});
app.post("/upload", function (req, res) {
  res.send("I get it");
  var tempObject = {
    name: req.body.name,
    date: req.body.date,
    picture: req.body.picture,
    celebrate: req.body.celebrate,
    description: req.body.description,
    dayType: req.body.dayType
  };
  holydays.push(tempObject);
  console.log(holydays);
  var dataString = JSON.stringify(holydays, null, 2);
  fs.writeFile("./holydays.json", dataString, function (err) {
    if (err) return console.log(err);
  });
});
app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT); // eslint-disable-line
});