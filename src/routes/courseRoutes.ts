import express from 'express';
import { create, getAll, getById, update, remove } from '../controllers/courseController';
import { authMiddleware } from '../middleware/authMiddleware';
import { createCourseSchema } from '../validations/coursevalidation';
import {validate} from "../middleware/validate";

const router = express.Router();

router.post('/', authMiddleware, validate(createCourseSchema),create); 
router.get('/', getAll); 
router.get('/:id', getById); 
router.put('/:id', authMiddleware, update); 
router.delete('/:id', authMiddleware, remove); 

export default router;