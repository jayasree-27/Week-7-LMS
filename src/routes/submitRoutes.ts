import express from "express";
import { submitAssignment, getSubmissions, grade } from "../controllers/submitController";
import { validate } from "../middleware/validate";
import { createSubmissionSchema, gradeSubmissionSchema } from "../validations/submitValidation";
import { authMiddleware} from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.post(
  "/submit",
  authMiddleware,
  roleMiddleware(["Student"]),
  validate(createSubmissionSchema),
  submitAssignment
);

router.get(
  "/assignment/:assignmentId",
  authMiddleware,
  roleMiddleware(["Instructor", "Admin"]),
  getSubmissions
);

router.patch(
  "/grade/:id",
  authMiddleware,
  roleMiddleware(["Instructor", "Admin"]),
  validate(gradeSubmissionSchema),
  grade
);

export default router;
