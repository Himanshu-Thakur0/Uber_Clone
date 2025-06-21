import { Router } from "express";
import { SignIn, SignOut, SignUp } from "../controllers/auth.controller.ts";

const authRouter = Router();

authRouter.post("/sign-up" , SignUp)
authRouter.get("/sign-in" , SignIn)
authRouter.post("/sign-out" , SignOut)

export default authRouter;