import express from "express";
import {signupUser, loginUser, getUserProfile} from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router(); 

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
router.post("/signup", signupUser);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post("/login", loginUser)

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (Requires JWT)
router.get("/profile", verifyToken, getUserProfile);

export default router;

