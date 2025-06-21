import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";


const userRouter = Router();

userRouter.get("/", authenticate, getUsers)
userRouter.get("/:id", authenticate, getUser)

export default userRouter;