import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import candidateRoutes from "./routes/candidate.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);

app.get("/", (req, res) => {
  res.send("Referral Management System API running");
});
app.use(errorHandler);

export default app;
