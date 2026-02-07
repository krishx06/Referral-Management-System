import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone number must be a 10-digit number"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Hired"],
      default: "Pending",
    },
    resumeUrl: {
      type: String,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
