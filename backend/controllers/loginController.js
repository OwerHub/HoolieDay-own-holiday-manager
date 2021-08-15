const fetch = require("node-fetch");
var jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");

// fetch and decoded datas from Google
const googleFetch = async (code) => {
  // console.log(code);
  //console.log("env", process.env.CLIENT_SECRET);

  const fetchHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const fetchBody = {
    code: code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: "http://localhost:3000/login",
    grant_type: "authorization_code",
  };

  // ask datas from google
  const response = await fetch("https://oauth2.googleapis.com/token", {
    headers: fetchHeaders,
    method: "POST",
    body: JSON.stringify(fetchBody),
  });

  // decoded json datas
  const tempResponse = await response.json();
  const IdTokenFromGoogle = tempResponse.id_token;
  const decodedToken = jwt.decode(IdTokenFromGoogle);

  const userDatas = {
    name: decodedToken.name,
    sub: decodedToken.sub,
    picture: decodedToken.picture,
    email: decodedToken.email,
    acess_token: "majd jön",
    refresh_token: "ez is ",
  };

  return userDatas;
};

// ask sub from database
const askUserFromDatabase = async (sub) => {
  const userSearch = await UserModel.findOne({
    sub: sub,
  });

  return userSearch;
};

// create new user
const createNewUser = async (name, sub) => {
  const newUser = new UserModel({
    name: name,
    sub: sub,
    nickName: name,
  });

  const response = await newUser.save();

  return response;
};

exports.testFunct = (req, res) => {
  res.send("im a testfunction in Login");
};

exports.postCatchLoginCode = async (req, res) => {
  // kideríteni, miért kell még egy code
  const googleCodeFromFrontend = req.body.code.code;

  const userDatasFromGoogle = await googleFetch(googleCodeFromFrontend);

  let userDatasFromDatabase = await askUserFromDatabase(userDatasFromGoogle.sub);

  if (userDatasFromDatabase === null) {
    userDatasFromDatabase = await createNewUser(
      userDatasFromGoogle.name,
      userDatasFromGoogle.sub
    );
  }

  console.log("userdatas:");
  console.log(userDatasFromDatabase);

  res.json({ message: "okay, I catch it", code: googleCodeFromFrontend });
};
