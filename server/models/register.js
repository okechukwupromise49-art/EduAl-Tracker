const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
     surname:{
        type: String,
        required: true
        
    },
     level:{
        type: Number,
        required: true
        
    },
     email:{
        type: String,
        required: true
        
    },
     password:{
        type: String,
        required: true
        
    },
    profilePic: {
    type: String,           // e.g. "https://cloudinary.com/.../oke.jpg"
    default: null,          // or a default avatar URL
  },
  profilePicPublicId: {
    type: String,
    default: null,
  }
})

module.exports = mongoose.model("Register", registerSchema) 