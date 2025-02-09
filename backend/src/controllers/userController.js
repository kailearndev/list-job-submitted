
import mongoose from "mongoose"
import User from "../models/userModel.js"

const getUser = async (_, res) => {
    try {
        const data = await User.find().select("-password -companies")

        res.status(200).json({
            statusCode: 200,
            data: data
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                statusCode: 400,
                error: "Invalid ID format"
            });
            return
        }

        const data = await User.findByIdAndDelete(id)

        if (!data) {
            return res.status(400).json({
                statusCode: 400,
                error: "User not found!"
            });
        }
        return res.status(200).json({
            statusCode: 200,
        })


    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            error: "Internal server error"
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // ID của user cần cập nhật
        const { role, id: userId } = req.user; // Role và ID từ thông tin người dùng đã xác thực

        // Kiểm tra ID hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                statusCode: 400,
                error: "Invalid ID format",
            });
        }

        // Kiểm tra quyền
        if (role === "user" && userId !== id) {
            return res.status(403).json({
                statusCode: 403,
                message: "You can only update your own information",
            });
        }

        // Cập nhật thông tin user
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                error: "User not found!",
            });
        }

        return res.status(200).json({
            statusCode: 200,
            data: user, // Trả về user đã được cập nhật
        });
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({
            statusCode: 500,
            error: "Internal server error",
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                statusCode: 400,
                error: "Invalid ID format"
            });
            return
        }

        const data = await User.findById(id)

        if (!data) {
            return res.status(400).json({
                statusCode: 400,
                error: "User not found!"
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: data
        })


    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            error: "Internal server error"
        })
    }
}

const createUser = async (req, res) => {
    try {
        const data = await User(req.body).save()
        res.status(200).json({
            statusCode: 200,
            data: data
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: error.message
        })
    }
}


export const UserController = {
    getUser,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}