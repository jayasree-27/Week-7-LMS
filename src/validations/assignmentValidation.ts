// validations/assignmentValidation.ts
import Joi from "joi";
import mongoose from "mongoose";

export const createAssignmentSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).max(300).required(),
  course: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }).required(),
  dueDate: Joi.date().greater("now").required().messages({
    "date.greater": "Due date must be a future date",
  }),
});

