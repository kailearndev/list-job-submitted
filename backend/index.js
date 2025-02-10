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

const allowedOrigins = ["https://fe.list-job.kaidev.io.vn"];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Cho phép gửi cookie hoặc thông tin xác thực
};

app.use(cors(corsOptions));

// Nếu frontend gửi preflight request (OPTIONS), xử lý:
app.options("*", cors(corsOptions));

dbConnection()

app.use("/api/auth", authRoutes); // Sử dụng router authRoutes

app.use("/api", middleware([]), companyRoutes)
app.use("/api", userRoutes)
app.use("/api", dashboardRoutes)




app.listen(PORT, () =>
    console.log("server run", PORT)

)