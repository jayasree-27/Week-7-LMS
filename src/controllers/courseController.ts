import { Request,Response } from "express";
import { createCourse,
    getAllCourses, 
    getCourseById, 
    updateCourse, 
    deleteCourse
 } from "../services/courseService";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

interface AuthRequest extends Request {
    user?: any
}


 export const create =async(req:AuthRequest, res:Response)=>{
    try{

        if (!req.user || req.user.role !== "instructor") {
            throw new ApiError(403, "Only instructors can create courses");
            // res.status(403).json({ message: "Only instructors can create courses" });
            // return 
        }
      
        const {title, description}=req.body;
        const instructorId: string = req.user?.id!;
        const course = await createCourse(title, description, instructorId);
        throw new ApiResponse(201,course, "Course created successfully");
        // res.status(201).json({
        //     message:"Course created successfully",
        //     course,
        // })
    }
    catch(error:any){
        throw new ApiError(500, "Error in creating course", error.message);
        // res.status(500).json({
        //     message:"Error in creating course",
        //     error:error.message,
        // })
    }
}

export const getAll=async(req:Request, res:Response)=>{
    try{
        const course = await getAllCourses();
        throw new ApiResponse(200, course,"All courses fetched successfully");
        // res.status(200).json({
        //     message:"All courses fetched successfully",
        //     course,
        // })
    }
    catch(error:any){
        throw new ApiError(500, "Error in fetching courses", error.message);
        // res.status(500).json({
        //     message:"Error in fetching courses",
        //     error:error.message,
        // })
    }
}

export const getById=async(req:Request, res:Response)=>{
    try{
        const courseId = req.params.id;
        const course = await getCourseById(courseId);
        throw new ApiResponse(200, course,"Course fetched successfully");
        // res.status(200).json({
        //     message:"Course fetched successfully",
        //     course,
        // })
    }
    catch(error:any){
        throw new ApiError(500, "Error in fetching course", error.message);
        // res.status(500).json({
        //     message:"Error in fetching course",
        //     error:error.message,
        // })
    }
}


export const update =async(req:AuthRequest, res:Response)=>{
    try{
        const courseId = req.params.id;
        const {title, description}=req.body;
        const instructorId: string = req.user.id;
        const course = await updateCourse(courseId, title, description, instructorId);
        throw new ApiResponse(200, course,"Course updated successfully");
        // res.status(200).json({
        //     message:"Course updated successfully",
        //     course,
        // })
    }
    catch(error:any){
        throw new ApiError(500, "Error in updating course", error.message);
        // res.status(500).json({
        //     message:"Error in updating course",
        //     error:error.message,
        // })
    }
}

export const remove =async(req:AuthRequest, res:Response)=>{
    try{
        const courseId = req.params.id;
        const instructorId: string = req.user.id;
        const {course, message} = await deleteCourse(courseId, instructorId);
        throw new ApiResponse(200, course,message);
        // res.status(200).json({
        //     message,
        //     course,
        // })
    }
    catch(error:any){
        throw new ApiError(500, "Error in deleting course", error.message); 
        // res.status(500).json({
        //     message:"Error in deleting course",
        //     error:error.message,
        // })
    }
}

