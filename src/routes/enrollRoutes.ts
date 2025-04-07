import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { enroll, getEnrolled } from '../controllers/enrollController';

const router = express.Router();

router.post('/', authMiddleware, enroll); 
router.get('/', authMiddleware, getEnrolled); 

export default router;