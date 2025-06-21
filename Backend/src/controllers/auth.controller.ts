import mongoose, { Document } from "mongoose";
import { UserInput } from "../interfaces/auth.interface.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { userModel } from "../models/user.model.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { Request, Response, NextFunction } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.ts";
import { NODE_ENV } from "../config/env.ts";

export const SignUp = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { fullName, email, password }: UserInput = req.body;

            const existingUser = userModel.findOne({ email });
            if (!existingUser) {
                throw new ApiError(400, "User already exists with this email");
            }

            const newUser = await userModel.create(
                [{ fullName, email, password }],
                { session }
            );

            const accessToken = generateAccessToken(newUser._id);
            const refreshToken = generateRefreshToken(newUser._id);

            await session.commitTransaction();
            session.endSession();

            res.status(201)
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: NODE_ENV === "production",
                    sameSite: "strict",
                })
                .cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: NODE_ENV === "production",
                    sameSite: "strict",
                })
                .json(
                    new ApiResponse(200, [{token : accessToken},newUser], "User created successfully")
                );
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return next(error);
        }
    }
);


export const SignIn = asyncHandler(async (req, res) => {
    const { email, password }:UserInput = req.body;

    const user = await userModel.findOne({email});
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password or email");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const loggedInUser = await userModel.findById(user._id).select("-password -__v");
    if (!loggedInUser) {
        throw new ApiError(401, "User not logged in");
    }

    res.status(200)
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: NODE_ENV === "development",
            sameSite: "strict",
        })
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: NODE_ENV === "development",
            sameSite: "strict",
        })
        .json(
            new ApiResponse(200, [{token : accessToken}, loggedInUser], "User logged in successfully")
        );

    
});


export const SignOut = asyncHandler(async (req, res) => {});
