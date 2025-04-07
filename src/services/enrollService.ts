import mongoose from "mongoose";
import Course from "../models/courseModel";
import User from "../models/userModel";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const enrollStudent =async(courseId:string,studentId:string) =>{
    const course = await Course.findById(courseId);
    if(!course){
        throw new ApiError(404,"Course not found");
    }

    const student =await User.findById(studentId);
    if(!student || student.role !== "student"){
        throw new ApiError(403,"Student can only enroll in course");
    }

    if(course.studentsEnrolled.some((id) => id.toString() === studentId.toString())){
        throw new ApiError(400,"Student already enrolled in course");
    }

    course.studentsEnrolled.push(studentId as unknown as mongoose.Schema.Types.ObjectId);
    await course.save();

    const updatedCourse= await Course.findById(courseId).populate("studentsEnrolled", "name email");
    return {message:"Student enrolled successfully", course:updatedCourse};
}

export const getEnrolledStudents =async(courseId:string) =>{
    return Course.find({studentsEnrolled: courseId}).populate("studentsEnrolled", "name email");
}