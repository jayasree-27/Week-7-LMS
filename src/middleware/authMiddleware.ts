import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel"; 
import ApiError from "../utils/ApiError";

dotenv.config();

interface AuthRequest extends Request {
    user?: any
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer","");
  
      if (!token) {
        throw new ApiError(401,"No token provided");
        //res.status(401).json({ message: "No token provided" });
      }
  
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new ApiError(401,"Invalid token");
        //res.status(401).json({ message: "Invalid token" });
      }
  
      req.user = user; 
  
      next();
    } catch (error) {
        throw new ApiError(401,"Authentication failed");
      //res.status(401).json({ message: "Authentication failed", error });
    }
  };

