import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = Router();

const SALT_ROUNDS = 10;
const ALLOWED_ROLES = ["student", "teacher"];

const serializeUser = (userDoc) => {
  const { _id, name, email, role } = userDoc.toObject();

  return {
    id: _id.toString(),
    name,
    email,
    role,
  };
};

const generateToken = (userId) =>
  jwt.sign(
    { userId },
    process.env.JWT_SECRET || "fallback_secret_key_123",
    { expiresIn: "7d" }
  );

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name?.trim() || !email?.trim() || !password || !role) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Name, email, password, and role are all required.",
      });
    }

    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Role must be either student or teacher.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Conflict",
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // DEV-STAGE NOTE: self-selected role at registration is intentionally
    // permissive right now to speed up testing. Before this goes anywhere
    // near a real deployment, replace this block with admin-provisioned
    // or invite-code-gated teacher creation, and hard-code role: "student"
    // here again unconditionally.
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      user: serializeUser(user),
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Conflict",
        message: "An account with this email already exists.",
      });
    }

    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    const invalidCredentials = {
      error: "Unauthorized",
      message: "Invalid email or password.",
    };

    if (!user) {
      return res.status(401).json(invalidCredentials);
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json(invalidCredentials);
    }

    const token = generateToken(user._id.toString());

    res.json({
      user: serializeUser(user),
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", auth, (req, res) => {
  res.json({
    user: req.user,
  });
});

export default router;