import { Router } from "express";
import { validateCaptain } from "../validators/captain.validator.ts";
import { registerCaptain } from "../controllers/captain.controller.ts";

const captainRouter = Router();

captainRouter.post("/register",validateCaptain,registerCaptain)

export default captainRouter;