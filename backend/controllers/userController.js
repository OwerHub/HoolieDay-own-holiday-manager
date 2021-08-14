const UserModel = require("../models/UserModel");

exports.testFunct = (req, res) => {
  res.send("im a testfunction in userController");
};

exports.newUser = async (req, res) => {
  const newUser = new UserModel({
    name: req.body.name,
    sub: req.body.sub,
  });

  const response = await newUser.save();

  res.send(response);
};
