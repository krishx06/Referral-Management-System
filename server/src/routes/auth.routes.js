import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", (req, res, next) =>
  registerUser(req, res, next)
);

router.post("/login", (req, res, next) =>
  loginUser(req, res, next)
);


export default router;
