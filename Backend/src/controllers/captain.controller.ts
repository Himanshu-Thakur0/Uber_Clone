import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response, NextFunction } from "express";
import { createCaptain } from "../services/captain.service.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { CaptainInput } from "../interfaces/captain.interface.ts";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.ts";
import { NODE_ENV } from "../config/env.ts";
import { captainModel } from "../models/captain.model.ts";
import { ApiError } from "../utils/ApiError.ts";

export const registerCaptain = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { fullName, email, password, vehicle } = req.body;

        const existingCaptain = await captainModel.findOne({ email })
            if (existingCaptain) {
                throw new ApiError(401,"Captain already exists with this email");
            }

        const captainData: CaptainInput = {
            fullName,
            email,
            password,
            vehicle: {
                vehicleType: vehicle?.vehicleType,
                vehicleNumber: vehicle?.vehicleNumber,
                vehicleColor: vehicle?.vehicleColor,
                vehicleModel: vehicle?.vehicleModel,
                capacity: vehicle?.capacity,
            },
        };

        const newCaptain = await createCaptain(captainData);

        const accessToken = generateAccessToken(newCaptain._id);
        const refreshToken = generateRefreshToken(newCaptain._id);

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
                new ApiResponse(
                    200,
                    [{ token: accessToken }, newCaptain],
                    "captain registered successfully"
                )
            );
    }
);
