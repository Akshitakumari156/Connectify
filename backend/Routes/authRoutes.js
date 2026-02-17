import express from "express";
import {signup,login} from "../Controllers/AuthController.js"
import { signupValidation, authMiddleware } from "../Middlewares/AuthValidation.js";
import { verifyEmail } from "../Controllers/AuthController.js";

const router=express.Router();

router.get("/verify/:token", verifyEmail);
router.post("/signup",signupValidation,signup)
router.post("/login", login);

export default router;