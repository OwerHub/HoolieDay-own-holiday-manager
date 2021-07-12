const mongoose = require("mongoose");

const modelName = "realtype";

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model(modelName, typeSchema);
