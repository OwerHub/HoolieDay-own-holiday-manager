// mik ezek és hogy kerültek ide?
//const { POINT_CONVERSION_COMPRESSED } = require("constants");
//const { response } = require("express");

const HolyDayModell = require("../models/HolyDayModell");
const HolydayModel = require("../models/HolyDayModell");

exports.testFunct = (req, res) => {
  res.send("im a testfunction");
};

exports.newHolydayFunct = async (req, res) => {
  const defaultHolyDay = new HolydayModel({
    name: "elseje3",
    date: 232324,
    picture: "ez az URL helye",
    celebrate: "celebrate Placeholder",
    description: "desc placeholder",
    type: "type",
  });

  const inComingHolyDay = new HolydayModel({
    name: req.body.name,
    date: req.body.date,
    picture: req.body.picture,
    celebrate: req.body.celebrate,
    description: req.body.description,
    type: req.body.type,
  });

  const response = await inComingHolyDay.save();
  console.log(req.body);
  res.send(response);
};

exports.findAllHolydays = async (req, res) => {
  const response = await HolydayModel.find({}, (err, holydays) => {
    console.log(holydays);
    res.send(holydays);
  });
};

//error-t, nem talált cuccot le kéne kezelni
exports.deleteHolyday = async (req, res) => {
  if (req.query.id) {
    const response = await HolydayModel.deleteOne({ _id: req.query.id }, (err) => {
      console.log(err);
    });
    res.send(response);
  } else {
    res.send("we need an ID");
  }
};
