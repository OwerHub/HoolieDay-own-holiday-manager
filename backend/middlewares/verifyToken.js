const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log("bearer", bearerHeader);

  next();
};
