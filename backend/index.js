import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import middleware from "./src/middleware/middleware.js";
import authRoutes from "./src/routes/auth.js"
import companyRoutes from "./src/routes/company.js";
import userRoutes from "./src/routes/user.js";
import dashboardRoutes from "./src/routes/dashboard.js"; // Import routes
// Import routes
// Import routes
; // Import routes


import { dbConnection } from "./src/config/db.js";
import morgan from "morgan";
dotenv.config()
const app = express()
// check 
app.use(morgan("dev"))
app.use(express.json())

app.use(cors({
    origin: '*', // Hoặc cụ thể domain frontend của bạn, ví dụ: 'https://fe.list-job.kaidev.io.vn'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
const PORT = process.env.PORT || 9000

//connect db

dbConnection()

app.use("/api/auth", authRoutes); // Sử dụng router authRoutes

app.use("/api", middleware([]), companyRoutes)
app.use("/api", userRoutes)
app.use("/api", dashboardRoutes)




app.listen(PORT, () =>
    console.log("server run", PORT)

)