const express = require("express");
//fs = require("fs"); // ez majd nem fog kelleni
const cors = require("cors");
const app = express();
const PORT = 8000;
require("dotenv").config(); // dontenv-hez

app.use(cors());
app.use(express.json());

const url = process.env.CONNECTION_STRING; //  ezt majd kitörölni

const loginRoutes = require("./routes/loginRoute");
app.use("/api/login", loginRoutes);

const holydayRoutes = require("./routes/holydayRoutes");
app.use("/api/holyday", holydayRoutes);

const typeRoutes = require("./routes/typeRoutes");
app.use("/api/type", typeRoutes);

const userTypeRoutes = require("./routes/userTypeRoutes");
app.use("/api/userType", userTypeRoutes);

// ezek itt nem fontosak
const utilityRoutes = require("./routes/utilityRoutes");
app.use("/api/utility", utilityRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

module.exports = app;
