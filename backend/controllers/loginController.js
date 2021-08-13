const googleFetch = (code) => {
  console.log(code);
  console.log("env", process.env.CLIENT_SECRET);
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
