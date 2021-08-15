const HolyDayModell = require("../models/HolyDayModell");
const HolydayModel = require("../models/HolyDayModell");
const UserModel = require("../models/UserModel");
exports.testFunct = (req, res) => {
  res.send("im a testfunction");
};

exports.newHolydayFunct = async (req, res) => {
  // search User
  const searchUser = await UserModel.findOne({
    _id: "61189d5746173501f078e047",
  });

  if (searchUser) {
    searchUser.holydays.push({
      name: req.body.name,
      date: req.body.date,
      picture: req.body.picture,
      celebrate: req.body.celebrate,
      description: req.body.description,
      type: req.body.type,
    });

    const response = await searchUser.save();
    console.log(response.holydays);
    res.send(response.holydays);
  }

  if (!searchUser) {
    console.log("valami gáz van, nem talál user-t");
    console.log(req.body);
    res.status(203).send("user not found");
  }
};

exports.findAllHolydays = async (req, res) => {
  const response = await UserModel.findOne({ _id: "61189d5746173501f078e047" });

  res.send(response.holydays);
};

//error-t, nem talált cuccot le kéne kezelni
exports.deleteHolyday = async (req, res) => {
  const response = await UserModel.findOneAndUpdate(
    {
      "holydays._id": req.body.id,
    },
    {
      $pull: {
        holydays: {
          _id: req.body.id,
        },
      },
    },
    {
      new: true,
    }
  );

  res.send(response.holydays);
};
