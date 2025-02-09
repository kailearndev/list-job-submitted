// src/routes/authRoutes.js
import express from "express";
import authController from "../controllers/authController.js"; // Import controller
import middleware from "../middleware/middleware.js";

const router = express.Router();

// Định nghĩa route đăng nhập
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/me", middleware([]), authController.getMe);

export default router;
