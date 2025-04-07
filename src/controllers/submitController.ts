import { Request, Response, NextFunction } from "express";
import * as submissionService from "../services/submitService";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

interface AuthRequest extends Request {
    user?: any
}

export const submitAssignment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = {
      ...req.body,
      studentId: req.user._id,
    };
    const submission = await submissionService.createSubmission(data);
    throw new ApiResponse(201, submission, "Assignment submitted successfully");
    //res.status(201).json({ success: true, submission });
  } catch (err) {
    throw new ApiError(500, "Error in submitting assignment", (err as Error).message);
  }
};

export const getSubmissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignmentId = req.params.assignmentId;
    const submissions = await submissionService.getSubmissionsByAssignment(assignmentId);
    throw new ApiResponse(200, submissions, "Submissions fetched successfully");
    //res.status(200).json({ success: true, submissions });
  } catch (err) {
    throw new ApiError(500, "Error in fetching submissions", (err as Error).message);
    // next(err);
  }
};

export const grade = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const submissionId = req.params.id;
    const graded = await submissionService.gradeSubmission(submissionId, req.body);
    throw new ApiResponse(200, graded, "Submission graded successfully");
    //res.status(200).json({ success: true, graded });
  } catch (err) {
    throw new ApiError(500, "Error in grading submission", (err as Error).message); 
    //next(err);
  }
};
