const fetch = require("node-fetch");

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
    redirect_uri: "http://localhost:3000",
    grant_type: "authorization_code",
  };

  const googleFetchUrl = "https://oauth2.googleapis.com/token";

  const response = await fetch(googleFetchUrl, {
    headers: fetchHeaders,
    method: "POST",
    body: JSON.stringify(fetchBody),
  });

  console.log(response);
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
