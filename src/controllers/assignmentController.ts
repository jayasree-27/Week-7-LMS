import { Request,Response } from "express";
import { createAssignment, getAllAssignmentsService,getAssignmentByIdService} from "../services/assignmentService";
import { ApiResponse } from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";

interface AuthRequest extends Request {
    user?: any
}

export const create=async(req:AuthRequest, res:Response)=>{
    try{
        const {title, description, course,dueDate} = req.body;
        
        const assignment = await createAssignment(title, description, course, dueDate,req.user);
        throw new ApiResponse(201, assignment, "Assignment created successfully");
        // res.status(201).json({
        //     message:"Assignment created successfully",
        //     assignment,
        // })
    }
    catch(error:any){
        throw new ApiError(500, "Error in creating assignment", error.message);
        // res.status(500).json({
        //     message:"Error in creating assignment",
        //     error:error.message,
        // })
    }
}



export const getAllAssignments = async (req: Request, res: Response) => {
    try {
      const assignments = await getAllAssignmentsService();
      throw new ApiResponse(200, assignments, "All assignments fetched successfully");
      //res.status(200).json(assignments);
    } catch (error: any) {
        throw new ApiError(500, "Error fetching assignments", error.message);
      //res.status(500).json({ message: "Error fetching assignments", error: error.message });
    }
  };
  
  export const getAssignmentById = async (req: Request, res: Response) => {
    try {
      const assignment = await getAssignmentByIdService(req.params.id);
      throw new ApiResponse(200, assignment, "Assignment fetched successfully");
      // res.status(200).json(assignment);
    } catch (error: any) {
        throw new ApiError(404, "Error fetching assignment", error.message);
        //res.status(404).json({ message: "Error fetching assignment", error: error.message });
    }
  };


export const deleteAssignment=async(req:Request, res:Response)=>{
  
}