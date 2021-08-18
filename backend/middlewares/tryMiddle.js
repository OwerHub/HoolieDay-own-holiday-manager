const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  //const token = req.headers.authorization.split(" ")[1];

  const SECRET = "secretToken"; // temp burn

  console.log("middleware runs");
  console.log("auth", token);

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.log("error", err);
      res.status(403).send("access denied");
    } else {
      console.log("decoded", decoded);
      //req.idFromToken = "61189d5746173501f078e047";
      req.idFromToken = decoded.id;

      next();
    }
  });
};
