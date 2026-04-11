const mongoose = require("mongoose")

const cgpaSchema = new mongoose.Schema({

  level: {
    type: Number,
    required: true
  },

  semester: {
    type: Number,
    required: true
  },

  course: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },

  credit: {
    type: Number,
    required: true
  },

  grade: {
    type: String,
    required: true,
    enum: ["A","B","C","D","E","F"]
  },

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

},{timestamps:true})

module.exports = mongoose.model("Cgpa", cgpaSchema)