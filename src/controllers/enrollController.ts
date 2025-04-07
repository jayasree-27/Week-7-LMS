import { Request, Response } from "express";
import {  enrollStudent, getEnrolledStudents } from "../services/enrollService";    
import  { ApiResponse } from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";

interface AuthRequest extends Request {
    user?: any
}

export const enroll=async(req:AuthRequest, res:Response)=>{
    try{
        const {courseId} = req.body;
        const studentId = req.user.id;
        const response = await enrollStudent(courseId, studentId);
        throw new ApiResponse(200, response, "Student enrolled successfully");
        // res.status(200).json({
        //     message:"Student enrolled successfully",
        //     response
        // })
    }
    catch(error:any){
        throw new ApiError(500, "Error in enrolling student", error.message);
        // res.status(500).json({
        //     message:"Error in enrolling student",
        //     error:error.message,
        // })
    }
}

export const getEnrolled=async(req:AuthRequest, res:Response)=>{
    try{
        const studentId = req.user.id;
        const courses = await getEnrolledStudents(studentId);
        throw new ApiResponse(200, courses, "Enrolled students fetched successfully");
        // res.status(200).json({
        //     message:"Enrolled students fetched successfully",
        //     courses,
        // })
    }
    catch(error:any){
        throw new ApiError(500, "Error in fetching enrolled students", error.message);
        // res.status(500).json({
        //     message:"Error in fetching enrolled students",
        //     error:error.message,
        // })
    }
}

