import Assignment from '../models/assignmentModel';
import Course from '../models/courseModel';
import ApiError from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

export const createAssignment = async (
    title: string,
    description: string,
    courseId: string,
    dueDate: Date,
    user: any 
  ) => {
    const course = await Course.findById(courseId);
  
    if (!course) {
        throw new ApiError(404, "Course not found");
    }
  
    if (
      user.role === "Instructor" &&
      course.instructor.toString() !== user._id.toString()
    ) {
      throw new ApiError(401,"You are not authorized to create assignment for this course");
    }
  
    const assignment = new Assignment({
      title,
      description,
      course: courseId,
      dueDate: new Date(), 
    });
  
    await assignment.save();
    return assignment;
  };
  

  export const getAllAssignmentsService = async () => {
  return await Assignment.find().populate("course");
};

export const getAssignmentByIdService = async (assignmentId: string) => {
  const assignment = await Assignment.findById(assignmentId).populate("course");
  if (!assignment) {
    throw new Error("Assignment not found");
  }
  return assignment;
};