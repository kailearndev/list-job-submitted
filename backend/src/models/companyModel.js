import mongoose from "mongoose";

// Định nghĩa schema cho Company
const companySchema = new mongoose.Schema(
    {
        companyName: { type: String, required: true },
        title: { type: String, required: true },
        location: { type: String, required: true },
        status: { type: String, enum: ["sent", "rejected", "failed", "interview"], default: "sent" },
        tech: { type: String, required: true },
        salary: { type: String, required: true },
        submissionDate: { type: String, required: true },

        logo: { type: String },
        ownerUser: {

            type: String, // Lưu trực tiếp username
            required: true, // Bắt buộc nếu username cần lưu ngay từ đầu
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference tới model User
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
companySchema.index({ companyName: 1 })

// Export trực tiếp model
export default mongoose.model("Company", companySchema);
