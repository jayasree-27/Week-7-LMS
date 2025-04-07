import { Submission } from "../models/submitModel";

export const createSubmission = async (data: any) => {
  return await Submission.create(data);
};

export const getSubmissionsByAssignment = async (assignmentId: string) => {
  return await Submission.find({ assignmentId }).populate("studentId");
};

export const gradeSubmission = async (id: string, data: any) => {
  return await Submission.findByIdAndUpdate(
    id,
    { ...data, gradedAt: new Date() },
    { new: true }
  );
};
