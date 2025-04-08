import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { logger } from "../utils/logger";


export const register=async(req:Request, res:Response)=>{
    try{
        const {name, email, password, role}=req.body;
        
        const user =await registerUser(name, email,password,role);
        logger("user registered");
        throw new ApiResponse(201, user, "User registered successfully");
        // res.status(201).json({
        //     message:"User registered successfully",user
        // })
        
    }
    catch(error:any){
        throw new ApiError(500, "Error in registering user", error.message);
        // res.status(500).json({
        //     message:"Error in registering user",
        //     error:error.message
        // })
    }
}

export const login =async(req:Request, res:Response) =>{
    try{
        const {email,password}=req.body;
        const {token} = await loginUser(email ,password);
        throw new ApiResponse(200, token, "User logged in successfully");
        // res.status(200).json({
        //     message:"User logged in successfully",
        //     token
        // })
    }
    catch(error :any){
        throw new ApiError(401, "Error in logging in user", error.message);
        // res.status(500).json({
        //     message:"Error in logging in user",
        //     error:error.message
        // })
    }
} 

