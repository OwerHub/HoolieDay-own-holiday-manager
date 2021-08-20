const fetch = require("node-fetch");
var jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");

exports.testFunct = (req, res) => {
  res.json({ message: "im a testfunction in Login" });
};

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
  //console.log("tempresponse:", tempResponse);
  const IdTokenFromGoogle = tempResponse.id_token;
  const decodedToken = jwt.decode(IdTokenFromGoogle);
  //console.log("decodedToken", decodedToken);

  const userDatas = {
    name: decodedToken.name,
    sub: decodedToken.sub,
    picture: decodedToken.picture,
    email: decodedToken.email,
    access_token: tempResponse.access_token,
    refresh_token: tempResponse.refresh_token,
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
const createNewUser = async (name, sub, email) => {
  const newUser = new UserModel({
    name: name,
    sub: sub,
    nickName: name,
    email: email,
  });

  const response = await newUser.save();

  return response;
};

/* const updateTokens = async (sub, access_token, refresh_token)  ={
  const response = await UserModel.findOneAndUpdate({})
} */

// create Token
function createToken(id) {
  const token = jwt.sign(
    {
      id: id,
    },
    process.env.SECRET,
    { expiresIn: "6h" }
  );

  return token;
}

exports.postCatchLoginCode = async (req, res) => {
  // kideríteni, miért kell még egy code
  const googleCodeFromFrontend = req.body.code.code;

  const userDatasFromGoogle = await googleFetch(googleCodeFromFrontend);
  console.log("Userdata from google, login 99:", userDatasFromGoogle);

  let userDatasFromDatabase = await askUserFromDatabase(userDatasFromGoogle.sub);

  if (userDatasFromDatabase === null) {
    userDatasFromDatabase = await createNewUser(
      userDatasFromGoogle.name,
      userDatasFromGoogle.sub,
      userDatasFromGoogle.email
    );
  } else {
    console.log(
      "this is a acess token when wh have got a user",
      userDatasFromGoogle.access_token
    );
    console.log(
      "this is a refresh token when wh have got a user",
      userDatasFromGoogle.refresh_token
    );

    /*  const response_tokens = await UserModel.findOneAndUpdate(
      {
        sub: userDatasFromGoogle.sub,
      },
      {
        $set: {
          acess_token: userDatasFromGoogle.access_token,
          refresh_token: userDatasFromGoogle.refresh_token,
        },
      },
      {
        new: true,
      }
    ); */
  }

  //console.log("login 134 updateAcessAndRefreshTOkens", response_tokens);

  const token = createToken(userDatasFromDatabase._id);

  const sendAllData = {
    name: userDatasFromDatabase.nickName,
    id: userDatasFromDatabase._id,
    picture: userDatasFromGoogle.picture,
    email: userDatasFromDatabase.email,
    holydays: userDatasFromDatabase.holydays,
    types: userDatasFromDatabase.types,
  };

  console.log(sendAllData);

  res.status(200).json({ datas: sendAllData, token: token });
};

exports.updateUserKey = async (req, res) => {
  const response = await UserModel.findOneAndUpdate(
    {
      _id: req.idFromToken, // átírni majd a token_ID-re
    },
    { [req.body.key]: req.body.value },
    { new: true }
  );

  console.log(" (holydayController146) response in update: ", response);
  res.json({ newName: response.nickName });
};
