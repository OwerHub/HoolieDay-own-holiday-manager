/* const express = require("express");
const app = express();
require("dotenv").config(); */

let holydaysFromJson = require("../holydays.json");
const HolydayModel = require("../models/HolyDayModell");

//console.log(holydays);

exports.copyFromJson = async (req, res) => {
  holydaysFromJson.map((items) => {
    const HolydayFromJson = new HolydayModel({
      name: items.name,
      date: parseInt(items.date),
      picture: items.picture,
      celebrate: items.celebrate,
      description: "items.description",
      type: items.dayType,
    });
    const response = HolydayFromJson.save();

    //console.log(items.name);
    //console.log(parseInt(items.date));
    //console.log(items.celebrate);
    //console.log(items.description);
    //console.log(items.dayType);
    //console.log(items.picture);
  });
  res.send("OK");
};
