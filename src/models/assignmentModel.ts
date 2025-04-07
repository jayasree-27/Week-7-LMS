import mongoose, { Schema, Document } from "mongoose";

export interface IAssignment extends Document {
  title: string;
  description: string;
  course: mongoose.Schema.Types.ObjectId;
  submissions: {
    student: mongoose.Schema.Types.ObjectId;
    fileUrl: string;
    grade?: number;
  }[];
}

const AssignmentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    submissions: [
      {
        student: { type: Schema.Types.ObjectId, ref: "User" },
        fileUrl: { type: String, required: true },
        grade: { type: Number }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IAssignment>("Assignment", AssignmentSchema);
