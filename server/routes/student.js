import { Router } from "express";
import StudentProfile from "../models/StudentProfile.js";
import Enrollment from "../models/Enrollment.js";

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

const serializeSubject = (subjectDoc) => {
  const { _id, name, code, teacher, createdAt, updatedAt } = subjectDoc.toObject();
  return {
    id: _id.toString(),
    name,
    code: code || "",
    teacher: teacher.toString(),
    createdAt,
    updatedAt,
  };
};

const findOrCreateProfile = async (userId) => {
  try {
    return await StudentProfile.findOneAndUpdate(
      { user: userId },
      { $setOnInsert: { user: userId } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } catch (error) {
    if (error.code === 11000) {
      return StudentProfile.findOne({ user: userId });
    }
    throw error;
  }
};

router.get("/profile", async (req, res, next) => {
  try {
    const profile = await findOrCreateProfile(req.user.id);
    res.json({ profile: serializeProfile(profile, req.user) });
  } catch (error) {
    next(error);
  }
});

router.get("/subjects", async (req, res, next) => {
  try {
    const profile = await findOrCreateProfile(req.user.id);

    const enrollments = await Enrollment.find({ student: profile._id }).populate("subject");

    res.json({
      subjects: enrollments.map((enrollment) => serializeSubject(enrollment.subject)),
    });
  } catch (error) {
    next(error);
  }
});

export default router;