import Course, {ICourse} from "../models/courseModel";
import User from "../models/userModel";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const createCourse=async (title:string,description:string, instructorId:string)=>{
    const instructor=await User.findById(instructorId);
    if(!instructor || instructor.role !== "instructor"){
        throw new ApiError(401,"Instructor can only create course");
    }
    const course =await Course.create({title,description,instructor:instructorId});

    const courseWithInstructor = await Course.findById(course._id).populate("instructor", "username email");

    return {course, courseWithInstructor};
}

export const getAllCourses=async()=>{
    return Course.find({}).populate("instructor","name email");
}

export const getCourseById=async(courseId:string)=>{
    return Course.findById(courseId).populate("instructor","name email");
}

export const updateCourse=async(courseId:string,title:string,description:string, instructorId:string)=>{
    const course = await Course.findById(courseId);
    if(!course){
        throw new ApiError(404,"Course not found");
    }
    if(course.instructor.toString() !== instructorId){
        throw new ApiError(401,"You are not authorized to update this course");
    }

    course.title=title;
    course.description=description;
    await course.save();

    return course;
}

export const deleteCourse=async(courseId:string,instructorId:string)=>{
    const course = await Course.findById(courseId);
    if(!course){
        throw new ApiError(404,"Course not found");
    }
    if(course.instructor.toString() !== instructorId){
        throw new ApiError(401,"You are not authorized to delete this course");
    }

    await course.deleteOne();
    return {course, message :"Course deleted successfully"};
}