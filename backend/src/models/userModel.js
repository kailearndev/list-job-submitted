import mongoose from "mongoose";

// Định nghĩa schema cho Company
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        name: {
            type: String,

        },
        password: {
            type: String, required: true,
            minLength: 6
        },
        logo: { type: String },
        role: {
            type: [String],
            enum: ["user", "admin"], // Các role được định nghĩa
            default: "user" // Mặc định là user
        },
        companies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company", // Reference tới model Company
            }
        ]

    },

    {
        timestamps: true,
        versionKey: false
    }

);


// Export trực tiếp model
export default mongoose.model("user", userSchema);
