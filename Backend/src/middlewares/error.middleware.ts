import mongoose from "mongoose";
import { Request, Response, NextFunction , ErrorRequestHandler} from "express";
import { ApiError } from "../utils/ApiError.ts";
import { NODE_ENV } from "../config/env.ts";


const errorHandler:ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    interface ApiError extends Error {
        statusCode?: number;
        errors?: any[];
    }

    let error: ApiError = err;

    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? 400 : 500;

        const message = error.message || "Something went wrong";
        error = new ApiError(
            statusCode,
            message,
            error?.errors || [],
            err.stack
        );
    }

    const response = {
        ...error,
        message: error.message,
        ...(NODE_ENV === "development"
            ? { stack: error.stack }
            : {}),
    };

    res.status(error.statusCode || 500).json(response);
};

export { errorHandler };
