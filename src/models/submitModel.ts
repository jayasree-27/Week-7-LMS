import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String, 
    required: true,
  },
  grade: {
    type: Number,
    min: 0,
    max: 100,
  },
  feedback: {
    type: String,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  gradedAt: Date,
});

export const Submission = mongoose.model("Submission", submissionSchema);
