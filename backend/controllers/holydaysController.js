const UserModel = require("../models/UserModel");
exports.testFunct = (req, res) => {
  res.send("im a testfunction");
};

exports.newHolydayFunct = async (req, res) => {
  // search User
  const searchUser = await UserModel.findOne({
    _id: req.idFromToken,
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
    //console.log(response.holydays);
    res.send(response.holydays);
  }

  if (!searchUser) {
    console.log("valami gáz van, nem talál user-t");
    console.log(req.body);
    res.status(203).send("user not found");
  }
};

exports.findAllHolydays = async (req, res) => {
  //console.log("token in holydays", req.idFromToken);
  const response = await UserModel.findOne({ _id: req.idFromToken });

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

exports.updateHolyday = async (req, res) => {
  const response = await UserModel.findOneAndUpdate(
    {
      "holydays._id": req.body.id,
    },
    { $set: { [`holydays.$.${req.body.key}`]: req.body.value } },
    { new: true }
  );

  //console.log("response in update: ", response);
  res.json(response.holydays);
};

exports.saveToGoogle = async (req, res) => {
  const userDataResponse = await UserModel.findOne({ _id: req.idFromToken });

  const dataWhatNeed = {
    date: req.body.date,
    celebrate: req.body.celebrate,
    description: req.body.description,
    name: req.body.name,
    access_token: userDataResponse.acess_token,
    refresh_token: userDataResponse.refresh_token,
  };

  res.send({ dataWhatNeed });
  /* 
  -----EZ SE LETT VOLNA ROSSZ MEGOLDÁS
  const selectedHolyday = userResponse.holydays.filter(
    (holyday) => holyday._id == req.body.id
  ); // két egyenlőségjellel mert Login-ra küldöm a dolgokat.
 */
};
