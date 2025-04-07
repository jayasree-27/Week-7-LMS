import Joi from "joi";

export const createSubmissionSchema = Joi.object({
  assignmentId: Joi.string().required(),
  content: Joi.string().required(),
});

export const gradeSubmissionSchema = Joi.object({
  grade: Joi.number().min(0).max(100).required(),
  feedback: Joi.string().optional(),
});
