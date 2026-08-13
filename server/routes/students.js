import { Router } from "express";
import mongoose from "mongoose";
import Student from "../models/Student.js";

const router = Router();

const serializeStudent = (studentDoc) => {
  const { _id, name, email, course, createdAt, updatedAt } = studentDoc.toObject();
  return { id: _id.toString(), name, email, course, createdAt, updatedAt };
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({ students: students.map(serializeStudent) });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Bad Request", message: "Invalid student id." });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: "Not Found", message: "Student not found." });
    }

    res.json(serializeStudent(student));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, course } = req.body;

    if (!name?.trim() || !email?.trim() || !course?.trim()) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Name, email, and course are all required.",
      });
    }

    const student = await Student.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      course: course.trim(),
    });

    res.status(201).json(serializeStudent(student));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Conflict",
        message: "A student with this email already exists.",
      });
    }
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Bad Request", message: "Invalid student id." });
    }

    const { name, email, course } = req.body;
    if (!name?.trim() || !email?.trim() || !course?.trim()) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Name, email, and course are all required.",
      });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { name: name.trim(), email: email.trim().toLowerCase(), course: course.trim() },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ error: "Not Found", message: "Student not found." });
    }

    res.json(serializeStudent(student));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Conflict",
        message: "A student with this email already exists.",
      });
    }
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Bad Request", message: "Invalid student id." });
    }

    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ error: "Not Found", message: "Student not found." });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;