const express = require("express");
fs = require("fs"); // ez majd nem fog kelleni
const cors = require("cors");
const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());

const holydayRoutes = require("./routes/holydayRoutes");
app.use("/api/holyday", holydayRoutes);

/* const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const typeRoutes = require("./routes/typeRoutes");
app.use("/api/type", typeRoutes); */

// --------old code from here----------
let holydays = require("./holydays.json");

app.get("/ping", function (req, res) {
  res.send("pong");
});

app.get("/allDay", function (req, res) {
  res.send(holydays);
});

app.post("/upload", (req, res) => {
  res.send("I get it");
  let tempObject = {
    name: req.body.name,
    date: req.body.date,
    picture: req.body.picture,
    celebrate: req.body.celebrate,
    description: req.body.description,
    dayType: req.body.dayType,
  };

  holydays.push(tempObject);
  console.log(holydays);

  let dataString = JSON.stringify(holydays, null, 2);

  fs.writeFile("./holydays.json", dataString, function (err) {
    if (err) return console.log(err);
  });
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT); // eslint-disable-line
});
