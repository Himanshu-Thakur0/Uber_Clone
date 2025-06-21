import { Router } from "express";
import { SignIn, SignUp } from "../controllers/auth.controller.ts";


const userRouter = Router();

userRouter.post("/sign-up", SignUp)
userRouter.get("/sign-in", SignIn)

export default userRouter;