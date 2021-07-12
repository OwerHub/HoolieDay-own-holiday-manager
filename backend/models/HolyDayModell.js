const mongoose = require("mongoose");

const modelName = "realholyday";

const holydaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  picture: { type: String, required: false },
  celebrate: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model(modelName, holydaySchema);
