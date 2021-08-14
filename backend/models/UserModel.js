const mongoose = require("mongoose");

const stringReq = {
  type: String,
  required: true,
};

const inHolydaySchema = new mongoose.Schema({
  name: stringReq,
  date: stringReq,
  picture: stringReq,
  celebrate: stringReq,
  description: stringReq,
  type: stringReq,
});

const myTypesSchema = new mongoose.Schema({
  name: stringReq,
  color: stringReq,
  description: stringReq,
});

const userSchema = new mongoose.Schema({
  name: stringReq,
  sub: stringReq,
  holydays: [inHolydaySchema],
  types: [myTypesSchema],
  acess_token: { type: String, default: "token will come" },
  refresh_token: { type: String, default: "token will come" },
});

module.exports = mongoose.model("user", userSchema);
