const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  device: {
    type: String,
    required: true,
    unique: true
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("device", deviceSchema);
