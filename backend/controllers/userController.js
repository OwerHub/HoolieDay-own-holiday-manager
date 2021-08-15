const UserModel = require("../models/UserModel");

exports.testFunct = (req, res) => {
  res.send("im a testfunction in userController");
};
// -----------USERS
// new User
exports.newUser = async (req, res) => {
  const newUser = new UserModel({
    name: req.body.name,
    sub: req.body.sub,
  });

  const response = await newUser.save();

  res.send(response);
};

// searchUser
exports.searchUser = async (req, res) => {
  const searchUser = await UserModel.findOne({
    _id: req.query.data,
  });

  res.send(response);
};

// UpdateUser
exports.updateUser = async (req, res) => {
  const response = await UserModel.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        [req.body.key]: req.body.value,
      },
    },
    {
      new: true,
    }
  );

  res.send(response);
};

// Delete User

exports.deleteUser = async (req, res) => {
  console.log(req.body.id);

  const response = await UserModel.findOneAndDelete({
    _id: req.body.id,
  });

  res.send(response);
};

//----------HOLYDAYS

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

// UpdateHolyDay
exports.updateHolyday = async (req, res) => {
  const response = await UserModel.findOneAndUpdate(
    {
      "holydays._id": req.body.id,
    },
    { $set: { [`holydays.$.${req.body.key}`]: "its fuckin works de télleg" } },
    { new: true }
  );

  res.send(response);
};

// deleteHolyday
exports.deleteHolyday = async (req, res) => {
  const deleteID = "6117413aaccf6f18fcf29552";

  const response = await UserModel.findOneAndUpdate(
    {
      "holydays._id": req.query.id,
    },
    {
      $pull: {
        holydays: {
          _id: req.query.id,
        },
      },
    },
    {
      new: true,
    }
  );

  res.send(response);
};

//types

//new Type
exports.newPersonType = async (req, res) => {
  const searchUser = await UserModel.findOne({
    _id: req.body.id,
  });

  // valamiért hibás ID-nél kiakad de elvileg ilyet nem is kap
  if (searchUser === null) {
    res.send("User not find");
  } else {
    searchUser.types.push({
      name: req.body.name,
      color: req.body.color,
      description: req.body.description,
    });

    const response = await searchUser.save();

    res.send(response);
  }
};

// update Type
exports.updateType = async (req, res) => {
  const response = await UserModel.findOneAndUpdate(
    {
      "types._id": req.body.id,
    },
    { $set: { [`types.$.${req.body.key}`]: req.body.value } },
    { new: true }
  );

  res.send(response);
};

// delete Type
exports.deleteType = async (req, res) => {
  const response = await UserModel.findOneAndUpdate(
    {
      "types._id": req.body.id,
    },
    {
      $pull: {
        types: {
          _id: req.body.id,
        },
      },
    },
    {
      new: true,
    }
  );

  res.send(response);
};
