import { Router } from "express";
import mongoose from "mongoose";
import Subject from "../models/Subject.js";
import Enrollment from "../models/Enrollment.js";
import StudentProfile from "../models/StudentProfile.js";
import User from "../models/User.js";

const router = Router();

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

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

const serializeEnrolledStudent = (enrollmentDoc) => {
  const profile = enrollmentDoc.student;
  const user = profile.user;
  return {
    enrollmentId: enrollmentDoc._id.toString(),
    profileId: profile._id.toString(),
    name: user.name,
    email: user.email,
    rollNumber: profile.rollNumber || "",
  };
};

router.get("/ping", (req, res) => {
  res.json({ message: "Teacher access confirmed.", user: req.user });
});

// ---------- Subjects ----------

router.post("/subjects", async (req, res, next) => {
  try {
    const { name, code } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Subject name is required.",
      });
    }

    const subject = await Subject.create({
      name: name.trim(),
      code: code?.trim() || undefined,
      teacher: req.user.id,
    });

    res.status(201).json(serializeSubject(subject));
  } catch (error) {
    next(error);
  }
});

router.get("/subjects", async (req, res, next) => {
  try {
    const subjects = await Subject.find({ teacher: req.user.id }).sort({ createdAt: -1 });
    res.json({ subjects: subjects.map(serializeSubject) });
  } catch (error) {
    next(error);
  }
});

router.get("/subjects/:subjectId", async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    if (!isValidObjectId(subjectId)) {
      return res.status(400).json({ error: "Bad Request", message: "Invalid subject id." });
    }

    const subject = await Subject.findOne({ _id: subjectId, teacher: req.user.id });
    if (!subject) {
      return res.status(404).json({ error: "Not Found", message: "Subject not found." });
    }

    res.json(serializeSubject(subject));
  } catch (error) {
    next(error);
  }
});

router.put("/subjects/:subjectId", async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    if (!isValidObjectId(subjectId)) {
      return res.status(400).json({ error: "Bad Request", message: "Invalid subject id." });
    }

    const { name, code } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Subject name is required.",
      });
    }

    const subject = await Subject.findOneAndUpdate(
      { _id: subjectId, teacher: req.user.id },
      { name: name.trim(), code: code?.trim() || undefined },
      { new: true, runValidators: true }
    );

    if (!subject) {
      return res.status(404).json({ error: "Not Found", message: "Subject not found." });
    }

    res.json(serializeSubject(subject));
  } catch (error) {
    next(error);
  }
});

router.delete("/subjects/:subjectId", async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    if (!isValidObjectId(subjectId)) {
      return res.status(400).json({ error: "Bad Request", message: "Invalid subject id." });
    }

    const subject = await Subject.findOneAndDelete({ _id: subjectId, teacher: req.user.id });
    if (!subject) {
      return res.status(404).json({ error: "Not Found", message: "Subject not found." });
    }

    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// ---------- Enrollments ----------

router.post("/subjects/:subjectId/enrollments", async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    if (!isValidObjectId(subjectId)) {
      return res.status(400).json({ error: "Bad Request", message: "Invalid subject id." });
    }

    const subject = await Subject.findOne({ _id: subjectId, teacher: req.user.id });
    if (!subject) {
      return res.status(404).json({ error: "Not Found", message: "Subject not found." });
    }

    const { email } = req.body;
    if (!email?.trim()) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Student email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const studentUser = await User.findOne({ email: normalizedEmail, role: "student" });

    if (!studentUser) {
      return res.status(404).json({
        error: "Not Found",
        message: "No student account found with that email.",
      });
    }

    let profile;
    try {
      profile = await StudentProfile.findOneAndUpdate(
        { user: studentUser._id },
        { $setOnInsert: { user: studentUser._id } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    } catch (error) {
      if (error.code === 11000) {
        profile = await StudentProfile.findOne({ user: studentUser._id });
      } else {
        throw error;
      }
    }

    const enrollment = await Enrollment.create({
      student: profile._id,
      subject: subject._id,
    });

    res.status(201).json({
      id: enrollment._id.toString(),
      student: {
        profileId: profile._id.toString(),
        name: studentUser.name,
        email: studentUser.email,
      },
      subject: serializeSubject(subject),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Conflict",
        message: "This student is already enrolled in this subject.",
      });
    }
    next(error);
  }
});

router.get("/subjects/:subjectId/students", async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    if (!isValidObjectId(subjectId)) {
      return res.status(400).json({ error: "Bad Request", message: "Invalid subject id." });
    }

    const subject = await Subject.findOne({ _id: subjectId, teacher: req.user.id });
    if (!subject) {
      return res.status(404).json({ error: "Not Found", message: "Subject not found." });
    }

    const enrollments = await Enrollment.find({ subject: subject._id })
      .populate({
        path: "student",
        populate: { path: "user", select: "name email" },
      })
      .sort({ createdAt: -1 });

    res.json({ students: enrollments.map(serializeEnrolledStudent) });
  } catch (error) {
    next(error);
  }
});

export default router;