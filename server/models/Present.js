const mongoose = require("mongoose");

const presentSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
    unique: true
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("present", presentSchema);
