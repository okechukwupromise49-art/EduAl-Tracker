const mongoose = require("mongoose");

const gpaSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    min: 0,
    max: 5
    
  },

  credit: {
    type: Number,
    required: true
  },

  grade: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D", "E", "F"] // only allow valid grades
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Gpa", gpaSchema);