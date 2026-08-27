import { Router } from "express";
import mongoose from "mongoose";
import Subject from "../models/Subject.js";

const router = Router();

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

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get("/ping", (req, res) => {
  res.json({ message: "Teacher access confirmed.", user: req.user });
});

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

export default router;