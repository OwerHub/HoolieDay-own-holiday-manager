const fetch = require("node-fetch");
var jwt = require("jsonwebtoken");

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

  console.log(userDatas);
};

exports.testFunct = (req, res) => {
  res.send("im a testfunction in Login");
};

exports.postCatchLoginCode = async (req, res) => {
  // kideríteni, miért kell még egy code
  const googleCodeFromFrontend = req.body.code.code;

  googleFetch(googleCodeFromFrontend);

  res.json({ message: "okay, I catch it", code: googleCodeFromFrontend });
};
