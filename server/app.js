import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";
import studentsRouter from "./routes/students.js";
import studentRouter from "./routes/student.js";
import auth from "./middleware/auth.js";
import requireRole from "./middleware/requireRole.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);

app.use("/api/students", auth, requireRole("teacher"), studentsRouter);

app.use("/api/student", auth, requireRole("student"), studentRouter);

app.use(notFound);
app.use(errorHandler);

export default app;