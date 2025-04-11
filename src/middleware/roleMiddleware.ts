import { Request,Response,NextFunction } from "express";
import ApiError from "../utils/ApiError";

interface AuthRequest extends Request {
    user?: any
}

export const roleMiddleware = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      const userRole = req.user?.role; 
  
      if (!userRole || !roles.includes(userRole)) {
        throw new ApiError(403,"Access denied");
        //res.status(403).json({ message: "Access denied" });
      }
      next();
    };
  };



