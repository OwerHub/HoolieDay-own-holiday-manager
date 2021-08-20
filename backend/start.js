const app = require("./server");
const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const MONGO_CONNECTION = process.env.CONNECTION_STRING;

//MONGOOSE
mongoose
  .connect(`${MONGO_CONNECTION}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// LITSEN
app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT); // eslint-disable-line
});
