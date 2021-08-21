const UserModel = require("../models/UserModel");

const tempID = "61189d5746173501f078e047";

exports.testFunct = (req, res) => {
  res.send("im a testfunction in UserTypesController");
};

// newUserType
exports.newUserType = async (req, res) => {
  const searchUser = await UserModel.findOne({
    _id: tempID,
  });

  if (searchUser) {
    searchUser.types.push({
      name: req.body.name,
      color: req.body.color,
      description: req.body.description,
    });

    const response = await searchUser.save();
    //console.log(response.holydays);
    res.send(response.types);
  }

  res.send(searchUser);
};

// FindAll UserType
exports.findAllUserTpyes = async (req, res) => {
  //console.log("token in holydays", req.idFromToken);
  const response = await UserModel.findOne({ _id: tempID });

  res.send(response.types);
};

// update UserType
exports.updateUserTypes = async (req, res) => {
  const response = await UserModel.findOneAndUpdate(
    {
      "types._id": req.body.id,
    },
    { $set: { [`types.$.${req.body.key}`]: req.body.value } },
    { new: true }
  );

  //console.log("response in update: ", response);
  res.json(response.types);
};

//deleteUserType
exports.deleteUserType = async (req, res) => {
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

  res.send(response.types);
};
