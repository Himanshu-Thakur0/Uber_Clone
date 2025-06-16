import cookieParser from 'cookie-parser';
import express from 'express';
import { errorHandler } from './middlewares/error.middleware.ts';

const app = express();





//COMMON MIDDLEWARES :-
// Parse incoming JSON requests with a size limit of 16kb
app.use(express.json({ limit: "16kb" }));

// Parse incoming URL-encoded form data with a size limit of 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files (like images, CSS, JS) from the "public" folder
app.use(express.static("public"));

app.use(cookieParser())


// Import and use the user routes
import userRouter from './routes/user.routes.ts';
app.use('/api/v1/user', userRouter);






app.use(errorHandler)
export {app}