import express from "express";
import authRoutes from "./authRoutes";
import courseRoutes from "./courseRoutes";
import enrollRoutes from "./enrollRoutes";
import assignmentRoutes from "./assignmentRoutes"; 
import submitRoutes from "./submitRoutes";
const router=express.Router();


router.use("/auth", authRoutes);
router.use("/courses",courseRoutes); 
router.use("/enroll", enrollRoutes);
router.use("/assignments", assignmentRoutes); 
router.use("/submissions", submitRoutes);

export default router;