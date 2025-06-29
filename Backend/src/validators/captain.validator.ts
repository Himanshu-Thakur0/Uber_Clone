import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { captainModel } from "../models/captain.model.ts";
import { ApiError } from "../utils/ApiError.ts";

export const CaptainZodSchema = z.object({
    fullName: z.object({
        firstName: z.string().min(1, "First Name is required").trim(),
        lastName: z.string().min(1, "Last Name is required").trim(),
    }),
    email: z.string().email("Invalid email").trim(),
    password: z.string().min(1, "Password is required"),
    socketId: z.string().optional(),
    isOnline: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
    location: z
        .object({
            lat: z.number().optional(),
            lngt: z.number().optional(),
        })
        .optional(),
    vehicle: z.object({
        vehicleType: z.enum(["bike", "car", "auto"]).default("bike"),
        vehicleNumber: z.string().min(3, "Vehicle number too short"),
        vehicleColor: z.string().min(1, "Color required"),
        vehicleModel: z.string().min(1, "Model required"),
        capacity: z.number().min(1, "Capacity must be at least 1"),
    }),
});

// Middleware function
export const validateCaptain = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        CaptainZodSchema.parse(req.body);

        next();
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.errors || error,
        });
    }
};
