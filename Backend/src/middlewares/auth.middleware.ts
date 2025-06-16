import { ACCESS_SECRET } from "../config/env.ts";
import { ApiError } from "../utils/ApiError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}


export const authenticate = asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Authentication token is missing or invalid");
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET as string) as { id: string };
        req.user = { id: decoded.id }; // Assuming you want to attach user info to the request
    } catch (error) {
        throw new ApiError(401, "Authentication token is invalid");
    }
})