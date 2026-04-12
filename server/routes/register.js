const express = require("express");
const Register = require("../models/register")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const upload = require('../middleware/upload');
const { cloudinary } = require("../config/cloudinary");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.post("/register", async(req,res) =>{
    try{
        const {name,surname,level,email,password} = req.body
         

        if (!name || !surname || !level || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

       const existEmail = await Register.findOne({ email });

    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = new Register({
           name,
            surname,
            level,
            email,
            password: hashedPassword 
        })
        await user.save()
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
      expiresIn:"7d"
    })

    res.cookie("token", token, {
  httpOnly: true,
  secure: true, // true in production (HTTPS)
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

       res.json({
  message: "User registered",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    level: user.level
  }
})
        
    }catch(err){
         res.status(500).json({error:err.message})
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

       

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter email and password" });
            }

        const user = await Register.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
        httpOnly: true,
        secure: true, // true in production (HTTPS)
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

        res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            level: user.level
        }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/details", auth, async (req, res) => {
  try {
    const user = await Register.findById(req.user.id).select("-password");
        console.log(user)
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post(
  "/update",
  auth,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      console.log("=== PATCH /update STARTED ===");
      console.log("Body:", req.body);
      console.log("File:", req.file ? {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      } : "NO FILE");

      const userId = req.user.id;
      const updates = {};

      if (req.body.name && req.body.name.trim()) {
        updates.name = req.body.name.trim();
      }

    if (req.file) {
  console.log("Processing file upload...");

  try {
    const currentUser = await Register.findById(userId);

    if (currentUser && currentUser.profilePicPublicId) {
      try {
        await cloudinary.uploader.destroy(currentUser.profilePicPublicId);
        console.log("Old image deleted");
      } catch (err) {
        console.log("Delete failed:", err.message);
      }
    }

    // VERY IMPORTANT: log full object
    console.log("FULL FILE:", req.file);

    updates.profilePic = req.file.path;
    updates.profilePicPublicId = req.file.filename;

    console.log("New image:", updates.profilePic);

  } catch (err) {
    console.log("UPLOAD BLOCK ERROR:", err.message);
    throw err; // let outer catch handle it
  }
}      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No changes provided" });
      }

      const updatedUser = await Register.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-password");

      console.log("=== SUCCESS: Profile updated ===");
      res.json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("=== CRITICAL ERROR IN PATCH ROUTE ===");
      console.error("Error Name:", error.name);
      console.error("Error Message:", error.message);
      console.error("Error Stack:", error.stack);

      res.status(500).json({
        message: "Server error during profile update",
        error: error.message || "Unknown server error"
      });
    }
  }
);

router.get("/test-cloudinary", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    );
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
});



// Change password (user must be logged in)
router.put("/change-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await Register.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
 
  } catch (err) {
    console.error(err); // 🔥 THIS IS IMPORTANT
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", {
  httpOnly: true,
  secure: true, // true in production
  sameSite: "None",
  expires: new Date(0)
});
  res.json({ message: "Logged out" });
});



module.exports = router;