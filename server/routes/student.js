import { Router } from "express";
import StudentProfile from "../models/StudentProfile.js";

const router = Router();

const serializeProfile = (profileDoc, user) => {
  const { _id, rollNumber, createdAt, updatedAt } = profileDoc.toObject();
  return {
    id: _id.toString(),
    name: user.name,
    email: user.email,
    rollNumber: rollNumber || "",
    createdAt,
    updatedAt,
  };
};

router.get("/profile", async (req, res, next) => {
  try {
    let profile;
    try {
      profile = await StudentProfile.findOneAndUpdate(
        { user: req.user.id },
        { $setOnInsert: { user: req.user.id } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    } catch (error) {
      if (error.code === 11000) {
        profile = await StudentProfile.findOne({ user: req.user.id });
      } else {
        throw error;
      }
    }

    res.json({ profile: serializeProfile(profile, req.user) });
  } catch (error) {
    next(error);
  }
});

export default router;