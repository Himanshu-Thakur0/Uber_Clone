import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response, NextFunction } from "express";
import { userModel } from "../models/user.model.ts";
import { ApiError } from "../utils/ApiError.ts";

export const getUsers = asyncHandler(async (req:Request, res:Response , next:NextFunction) => {
    const users = await userModel.find().select("-password -__v");
    if (!users || users.length === 0) {
        throw new ApiError(400,"No users found");
    }

    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users
    });
})

export const getUser = asyncHandler(async (req:Request, res:Response , next:NextFunction) => {
    const userId = req.params.id;
    const user = await userModel.findById(userId).select("-password -__v");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user
    });
})