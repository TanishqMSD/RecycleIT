import express from "express";
import { register, login, handleGoogleAuth } from "../controllers/auth.controller.js";

const router = express.Router();

// REGISTER User
router.post("/register", register);

// LOGIN User
router.post("/login", login);

// Google Auth
router.post("/google", handleGoogleAuth);

export default router;