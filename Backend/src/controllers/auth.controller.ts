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
export const SignIn = asyncHandler(async (req, res) => {});
export const SignOut = asyncHandler(async (req, res) => {});
