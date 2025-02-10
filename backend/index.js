import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import middleware from "./src/middleware/middleware.js";
import authRoutes from "./src/routes/auth.js";
import companyRoutes from "./src/routes/company.js";
import userRoutes from "./src/routes/user.js";
import dashboardRoutes from "./src/routes/dashboard.js"; // Import routes
import { dbConnection } from "./src/config/db.js";
import morgan from "morgan";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

// Middleware: Logging
app.use(morgan("dev"));

// Middleware: Parse JSON
app.use(express.json());

// Middleware: CORS
app.use(
    cors({
        origin: "https://fe.list-job.kaidev.io.vn", // Chỉ cho phép frontend từ domain này truy cập
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Các method được phép
        allowedHeaders: ["Content-Type", "Authorization"], // Các header được phép
        credentials: true, // Nếu bạn sử dụng cookie hoặc token
    })
);

// Handle preflight requests
app.options("*", cors());

// Connect DB
dbConnection();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", middleware([]), companyRoutes);
app.use("/api", userRoutes);
app.use("/api", dashboardRoutes);

// Start server
app.listen(PORT, () => console.log("Server running on port", PORT));
