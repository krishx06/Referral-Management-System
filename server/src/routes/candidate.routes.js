import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
    createCandidate,
    getCandidates,
    getResume,
    updateCandidateStatus,
    deleteCandidate,
    getCandidateMetrics,
} from "../controllers/candidate.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", upload.single("resume"), createCandidate);
router.get("/", getCandidates);
router.get("/:id/resume", getResume);
router.put("/:id/status", updateCandidateStatus);
router.delete("/:id", deleteCandidate);

router.get("/metrics", getCandidateMetrics);

export default router;
