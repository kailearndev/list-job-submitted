import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = async () => {
    try {
        // Kết nối tới MongoDB bằng Mongoose
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
