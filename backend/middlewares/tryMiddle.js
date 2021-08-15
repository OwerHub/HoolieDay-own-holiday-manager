const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("middleware");
  console.log(req.headers.authorization);

  const authorizationCode = req.headers.authorization;
  const burn =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTg5ZDU3NDYxNzM1MDFmMDc4ZTA0NyIsImlhdCI6MTYyOTAyODM5OSwiZXhwIjoxNjI5MDQ5OTk5fQ.m1JvIuxSr-0OGLVABNntx6dyn0luWsqBG6yhFsgUa5E";
  const bearerToken = burn.split(" ")[1];
  console.log("token", bearerToken);
  next();
};
