const express = require("express");
const router = express.Router();
const Gpa = require("../models/gpa");
const auth = require("../middleware/auth");



router.post("/add", auth, async (req, res) => {
  try {
    const { course, grade, credit } = req.body;

    if (!course || !grade || !credit) {
      return res.status(400).json({ error: "All fields are required" });
    }

  

    const gpa = new Gpa({
      course,
      grade,
      credit,
      user: req.user.id
    });

    await gpa.save();

    res.status(201).json({ message: "✅ successfully calculated your GPA" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/reset", auth, async (req, res) => {
  try {
    await Gpa.deleteMany({ user: req.user.id });
    res.json({ message: "Old courses cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/addGpa",auth, async (req,res) => {
    try{
        const courses = await Gpa.find({user: req.user.id});
        const gradePoints = {
                         A: 5,
                        B: 4,
                        C: 3,
                        D: 2,
                        E: 1,
                        F: 0,

        }

        let totalPoints = 0
        let totalCredits = 0

        courses.forEach(course => {
            const credit = Number(course.credit);
            const gradePoint = gradePoints[course.grade]

            totalPoints += credit * gradePoint;
        totalCredits += credit
        })

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

let classification = "";

if (gpa >= 4.5) {
  classification = "First Class";
} else if (gpa >= 3.5) {
  classification = "Second Class Upper";
} else if (gpa >= 2.4) {
  classification = "Second Class Lower";
} else if (gpa >= 1.5) {
  classification = "Third Class";
} else {
  classification = "Pass";
}

const neededForFirstClass = gpa >= 4.5 ? 0 : (4.5 - gpa).toFixed(2);


        

        
        res.json({
      courses,
      totalCredits,
      gpa: Number(gpa.toFixed(2)),
      classification,
      neededForFirstClass
    });
    }
    catch(err){
          res.status(500).json({ error: err.message });
    }
} )

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const gpaId = req.params.id;

    const course = await Gpa.findOne({ _id: gpaId, user: req.user.id });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    await course.deleteOne();

    res.json({ message: "✅ Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;