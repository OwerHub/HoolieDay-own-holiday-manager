const UserModel = require("../models/UserModel");

exports.testFunct = (req, res) => {
  res.send("im a testfunction in userController");
};

// new User
exports.newUser = async (req, res) => {
  const newUser = new UserModel({
    name: req.body.name,
    sub: req.body.sub,
  });

  const response = await newUser.save();

  res.send(response);
};

//  make a new Holyday
exports.newHolyday = async (req, res) => {
  const searchUser = await UserModel.findOne({
    _id: req.body.id,
  });

  // valamiért hibás ID-nél kiakad
  if (searchUser === null) {
    res.send("User not find");
  } else {
    searchUser.holydays.push({
      name: req.body.name,
      date: req.body.date,
      picture: req.body.picture,
      celebrate: req.body.celebrate,
      description: req.body.description,
      type: req.body.type,
    });

    const response = await searchUser.save();

    res.send(response);
  }
};

// searchUser
exports.searchUser = async (req, res) => {
  const searchUser = await UserModel.findOne({
    _id: req.query.data,
  });

  res.send(searchUser);
};

// deleteHolyday
exports.deleteHolyday = async (req, res) => {
  const deleteID = "6117426c58bc1f1afcf96da6";

  const response = await UserModel.findOneAndUpdate(
    {
      "holydays._id": deleteID,
    },
    {
      $pull: {
        holydays: {
          _id: deleteID,
        },
      },
    },
    {
      new: true,
    }
  );

  res.send(response);
};
