// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import  ApiError  from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

    res.status(err.status || 500).json(
    new ApiResponse(err.status || 500, null, err.message || "Internal Server Error", err.errors || null)
  );
};


