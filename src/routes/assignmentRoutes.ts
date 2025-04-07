import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { validate } from "../middleware/validate";
import { createAssignmentSchema } from "../validations/assignmentValidation";
import * as assignmentController from "../controllers/assignmentController";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "instructor"]),
  validate(createAssignmentSchema),
  assignmentController.create
);

router.get("/", authMiddleware, assignmentController.getAllAssignments);
router.get("/:id", authMiddleware, assignmentController.getAssignmentById);

export default router;
