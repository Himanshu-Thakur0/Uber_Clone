import { ACCESS_SECRET } from "../config/env.ts";
import redisClient from "../config/redis.ts";
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

export const authenticate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized access");
        }

        const token = authHeader.split(" ")[1];

        const isBlacklisted = await redisClient.get(`bl_${token}`);
        if (isBlacklisted) {
            return res.status(401).json({ message: "Token is blacklisted" });
        }
        
        try {
            const decoded = jwt.verify(token, ACCESS_SECRET as string) as {
                id: string;
            };
            req.user = { id: decoded.id }; // Assuming you want to attach user info to the request
        } catch (error) {
            throw new ApiError(401, "Unauthorized access");
        }
    }
);
