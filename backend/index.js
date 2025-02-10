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
app.use(cors({
    origin: '*', // Chỉ cho phép frontend này
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options("*", cors()); // Cho phép tất cả các request OPTIONS

// Handle preflight requests

// Connect DB
dbConnection();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", middleware([]), companyRoutes);
app.use("/api", userRoutes);
app.use("/api", dashboardRoutes);

// Start server
app.listen(PORT, () => console.log("Server running on port", PORT));
