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
corsOptions = {
    origin: ['https://fe.list-job.kaidev.io.vn', 'http://localhost:5173', 'http://localhost:5173'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middleware: CORS


// Handle preflight requests
app.options("*", cors());

// Connect DB
dbConnection();

// Routes
app.use("/api/auth", cors(corsOptions), authRoutes);
app.use("/api", middleware([]), companyRoutes);
app.use("/api", userRoutes);
app.use("/api", dashboardRoutes);

// Start server
app.listen(PORT, () => console.log("Server running on port", PORT));
