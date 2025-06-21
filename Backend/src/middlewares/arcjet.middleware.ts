import aj from "../config/arcjet..ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response, NextFunction } from "express";

const arcjetMiddleware = asyncHandler(async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    const decision = await aj.protect(req, {requested: 1})

    if(decision.isDenied()) {
        
        if(decision.reason.isRateLimit()) return res.status(429).json({message: "Rate limit exceeded. Please try again later.",})
        if(decision.reason.isBot()) return res.status(403).json({message: "Bot detected",})

        return res.status(403).json({message: "Access denied",})
    }
    next();
})

export default arcjetMiddleware;