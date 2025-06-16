import { Router } from "express";
import { SignUp } from "../controllers/auth.controller.ts";


const userRouter = Router();

userRouter.post("/sign-up", SignUp)

export default userRouter;