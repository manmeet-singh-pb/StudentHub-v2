import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.js";
import studentsRouter from "./routes/students.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/students", studentsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;