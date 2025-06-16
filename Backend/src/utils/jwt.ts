import jwt from "jsonwebtoken";
import { ACCESS_EXPIRATION, ACCESS_SECRET, REFRESH_EXPIRATION, REFRESH_SECRET } from "../config/env.ts";

if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error("JWT secrets are not defined in the environment variables.");
}

export const generateAccessToken = (userId: string): string => {
    const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET as string, {
        expiresIn: ACCESS_EXPIRATION || "15m",
    });
    return accessToken;
}

export const generateRefreshToken = (userId: string): string => {
    const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET as string, {
        expiresIn: REFRESH_EXPIRATION || "7d",
    });
    return refreshToken;
}