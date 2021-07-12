/* const express = require("express");
const app = express();
require("dotenv").config(); */

let holydaysFromJson = require("../holydays.json");
let typesFromJson = require("../safety_save/oldtypes");
const HolydayModel = require("../models/HolyDayModell");
const TypeModel = require("../models/typeModell");

//console.log(holydays);

exports.copyHolydayFromJson = async (req, res) => {
  holydaysFromJson.map((items) => {
    const oneHolydayFromJson = new HolydayModel({
      name: items.name,
      date: items.date,
      picture: items.picture,
      celebrate: items.celebrate,
      description: "items.description",
      type: items.dayType,
    });
    const response = oneHolydayFromJson.save();
  });
  res.send("OK"); // el lehetne küldeni a válaszokat array-be
};

exports.copyTypesFromJson = async (req, res) => {
  typesFromJson.map((item) => {
    const oneTypeFromJson = new TypeModel({
      name: item.name, //{ type: String, required: true },
      color: item.color, //{ type: String, required: true },
      description: item.description, // { type: String, required: false },
    });
    const response = oneTypeFromJson.save();
    console.log(response);
  });

  res.send("ok");
};
