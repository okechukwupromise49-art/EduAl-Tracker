const express = require("express");
const  Notification =  require("../models/notification");
const Register = require("../models/register")
const auth = require("../middleware/auth");
const notification = require("../models/notification");

const router = express.Router();

// ✅ UPDATE CGPA
router.put("/update", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { cgpa } = req.body;

    // Find user
    const user = await Register.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const oldCgpa = user.cgpa;

    // Update CGPA
    user.cgpa = cgpa;
    await user.save();

      let message = ``
    // 🎯 Create notification if changed
    if (oldCgpa !== cgpa) {
       message = `Your CGPA has been updated to ${cgpa}`;

      if (oldCgpa < cgpa) {
       message = `Your CGPA has drop to ${cgpa}`}

      if (oldCgpa > cgpa) {
       message = `congrate Your CGPA has increase to ${cgpa}`}

      if (cgpa < 2.5) {
        message = "⚠️ Your CGPA dropped below 2.5";
      }

      await Notification.create({
        userId,
        message,
        type: "cgpa"
      });
    }

    res.json({ message: "CGPA updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/notifications
router.get("/getNotification", auth, async (req, res) => {
  const userId = req.user.id;

  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 });

  res.json(notifications);
});

router.patch("/markAsRead", auth, async(req, res) => {
     const userId = req.user.id;

  await Notification.updateMany(
    { userId, read: false },
    { read: true }
  );

  res.json({ message: "All notifications marked as read" });

})

router.patch("/unMarkAsRead", auth, async(req, res) => {
      const userId = req.user.id;

  const count = await Notification.countDocuments({
    userId,
    read: false
  });

  res.json({ count });

})
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findOne({
      _id: notificationId,
      userId: req.user.id
    });

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    await notification.deleteOne();

    res.json({ message: "✅ Notification deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;