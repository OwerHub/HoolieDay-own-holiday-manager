const mongoose = require("mongoose");

const holydaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Number, required: true },
  picture: { type: String, required: false },
  celebrate: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("HolyDayModell", holydaySchema);
