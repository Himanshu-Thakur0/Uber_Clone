import cookieParser from 'cookie-parser';
import express from 'express';
import { errorHandler } from './middlewares/error.middleware.ts';
import arcjetMiddleware from './middlewares/arcjet.middleware.ts';

const app = express();






app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())
app.use(arcjetMiddleware)

// Import and use routes
import userRouter from './routes/user.routes.ts';
app.use('/api/v1/users', userRouter);

import authRouter from './routes/auth.routes.ts';
app.use('/api/v1/auth', authRouter);

import captainRouter from './routes/captain.routes.ts';
app.use('/api/v1/captain', captainRouter);






app.use(errorHandler)
export {app}