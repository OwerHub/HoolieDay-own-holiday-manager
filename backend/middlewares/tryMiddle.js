//const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("middleware runs");
  //console.log("auth", token);

  const SECRET = "secretToken"; // temp burn

  req.idFromToken = "61189d5746173501f078e047";

  next();
};
