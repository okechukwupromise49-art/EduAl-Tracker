const express = require("express");
const Cgpa = require("../models/cgpa")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const router = express.Router();

router.post("/add", auth, async (req, res) => {
  try {

    const { semester, grade,  credit, course,level
  } = req.body;

  

      if (!level || !semester || !course || !grade || !credit) return
    

    const newCgpa = new Cgpa({
      course,
      grade,
      semester: Number(semester),
      credit: Number(credit),
      level:Number(level),
      user: req.user.id

    });

    await newCgpa.save();

    res.status(201).json({ message:  "✅ Course added successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/reset", auth, async (req, res) => {
  try {
    console.log("RESET ROUTE TRIGGERED");
    await Cgpa.deleteMany({ user: req.user.id });
    res.json({ message: "Old courses cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/details", auth, async (req, res) => {
  try {

    const courses = await Cgpa.find({ user: req.user.id });

    const gradePoints = {
      A: 5,
      B: 4,
      C: 3,
      D: 2,
      E: 1,
      F: 0
    };

    let totalGradePoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const point = gradePoints[course.grade] || 0;
      const credit = Number(course.credit) || 0;

      totalGradePoints += point * credit;
      totalCredits += credit;
    });

    const cgpa = totalCredits === 0 ? 0 : totalGradePoints / totalCredits;

    const progress = Math.min((cgpa / 4.5) * 100, 100).toFixed(0);

    let classification = "";

    if (cgpa >= 4.5) {
      classification = "First Class";
    } else if (cgpa >= 3.5) {
      classification = "Second Class Upper";
    } else if (cgpa >= 2.4) {
      classification = "Second Class Lower";
    } else if (cgpa >= 1.5) {
      classification = "Third Class";
    } else {
      classification = "Pass";
    }

    const neededForFirstClass = cgpa >= 4.5 ? 0 : (4.5 - cgpa).toFixed(2);

    const neededForSecondClass = cgpa >= 3.5 ? 0 : (3.5 - cgpa).toFixed(2);

    const neededForThirdClass = cgpa >= 2.0 ? 0 : (4.5 - cgpa).toFixed(2);

    


    res.json({
      cgpa: Number(cgpa.toFixed(2)),
      totalGradePoints,
      totalCredits,
      progress,
      classification,
      neededForFirstClass,
      neededForSecondClass,
      records: courses,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const cgpaId = req.params.id;
  
    const course = await Cgpa.findOne({ _id: cgpaId, user: req.user.id });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    await course.deleteOne();

    res.json({ message: "✅ Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/history", auth, async (req, res) => {
  try {
    const courses = await Cgpa.find({ user: req.user.id });

    const grouped = {};

    courses.forEach((course) => {
      const key = `${course.level}-${course.semester}`;

      if (!grouped[key]) {
        grouped[key] = {
          semester: course.semester,
          level: course.level,
          courses: [],
          totalPoints: 0,
          totalCredits: 0,
        };
      }

      const gradePoints = {
        A: 5,
        B: 4,
        C: 3,
        D: 2,
        E: 1,
        F: 0,
      };

      const point = gradePoints[course.grade] || 0;
      const credit = Number(course.credit);
      

      grouped[key].courses.push(course);
      grouped[key].totalPoints += point * credit;
      grouped[key].totalCredits += credit;
    });

    // Convert to array + calculate GPA
    const history = Object.values(grouped).map((sem) => {
      const gpa =
        sem.totalCredits === 0
          ? 0
          : sem.totalPoints / sem.totalCredits;

    

      return {
        ...sem,
        gpa: Number(gpa.toFixed(2))
      };
    });

    const bestSemester = history.reduce((best, current) => {
      return current.gpa > best.gpa ? current : best;
    });

    const worstSemester = history.reduce((worst, current) => {
      return current.gpa < worst.gpa ? current : worst;
    });

    res.json({
  history,
  bestSemester,
  worstSemester
});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;