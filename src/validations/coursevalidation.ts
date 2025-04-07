import Joi from "joi";
import mongoose from "mongoose";

export const createCourseSchema = Joi.object({
  title: Joi.string().min(3).max(10).required(),
  description: Joi.string().min(10).max(50).required(),
  instructor: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }).required(),
  studentsEnrolled: Joi.array().items(Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  })).optional(),
  assignments: Joi.array().items(Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  })).optional(),
});
