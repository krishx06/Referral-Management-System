import Candidate from "../models/Candidate.js";

export const createCandidate = async (req, res, next) => {
    try {
        const { name, email, phone, jobTitle } = req.body;

        if (!name || !email || !phone || !jobTitle) {
            res.status(400);
            throw new Error("All fields are required");
        }

        const candidate = await Candidate.create({
            name,
            email,
            phone,
            jobTitle,
            resumeUrl: req.file ? `/uploads/${req.file.filename}` : null,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            data: candidate,
        });
    } catch (error) {
        next(error);
    }
};

export const getCandidates = async (req, res, next) => {
    try {
        const candidates = await Candidate.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            count: candidates.length,
            data: candidates,
        });
    } catch (error) {
        next(error);
    }
};

export const updateCandidateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!status) {
            res.status(400);
            throw new Error("Status is required");
        }

        const candidate = await Candidate.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!candidate) {
            res.status(404);
            throw new Error("Candidate not found");
        }

        candidate.status = status;
        await candidate.save();

        res.json({
            success: true,
            data: candidate,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCandidate = async (req, res, next) => {
    try {
        const candidate = await Candidate.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!candidate) {
            res.status(404);
            throw new Error("Candidate not found");
        }

        res.json({
            success: true,
            message: "Candidate deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getCandidateMetrics = async (req, res, next) => {
    try {
        const total = await Candidate.countDocuments({ user: req.user._id });

        const pending = await Candidate.countDocuments({
            user: req.user._id,
            status: "Pending",
        });

        const reviewed = await Candidate.countDocuments({
            user: req.user._id,
            status: "Reviewed",
        });

        const hired = await Candidate.countDocuments({
            user: req.user._id,
            status: "Hired",
        });

        res.json({
            success: true,
            metrics: {
                totalCandidates: total,
                pending,
                reviewed,
                hired,
            },
        });
    } catch (error) {
        next(error);
    }
};
