
import mongoose from "mongoose"
import Company from "../models/companyModel.js"
import User from "../models/userModel.js"


const getCompany = async (req, res) => {

    try {
        const { id } = req.user
        const { page = 1, limit = 10, status } = req.query;
        const companies = await Company.find({
            owner: id,
            ...(status && { status })
        }).sort({ submissionDate: -1 }) // sort theo ngày submit
            .skip((page - 1) * limit) // Bỏ qua (page - 1) * limit tài liệu
            .limit(parseInt(limit));
        const totalCompanies = await Company.countDocuments({
            owner: id,
            ...(status && { status })
        }); // Đếm tổng số tài liệu
        res.status(200).json({
            statusCode: 200,
            data: companies,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCompanies / limit),
                totalItems: totalCompanies
            }

        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: error.message
        })
    }
}

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.user

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                statusCode: 400,
                error: "Invalid ID format"
            });
            return
        }

        const data = await Company.findByIdAndDelete({
            _id: id,
            owner: user_id,
        })

        if (!data) {
            return res.status(400).json({
                statusCode: 400,
                error: "Company not found!"
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
const updateCompany = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID của công ty từ URL params
        const userId = req.user.id; // Lấy ID của user từ token

        // Kiểm tra định dạng ID hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                statusCode: 400,
                error: "Invalid ID format",
            });
        }

        // Tìm công ty theo ID và kiểm tra quyền sở hữu
        const updatedCompany = await Company.findOneAndUpdate({ _id: id, owner: userId },
            req.body,
            {
                new: true
            }

        );
        if (!updatedCompany) {
            return res.status(403).json({
                statusCode: 403,
                error: "You are not authorized to update this company, or it does not exist.",
            });
        }

        // Cập nhật công ty

        // Object.assign(company, req.body); // Merge dữ liệu mới từ `req.body` vào object `company`


        res.status(200).json({
            statusCode: 200,
            data: updatedCompany,
        });
    } catch (error) {
        console.error("Update Company Error:", error.message);

        res.status(500).json({
            statusCode: 500,
            error: error.message || "Internal server error",
        });
    }
};

const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.user

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                statusCode: 400,
                error: "Invalid ID format"
            });
            return
        }

        const data = await Company.findById({
            _id: id,
            owner: user_id
        })

        if (!data) {
            return res.status(400).json({
                statusCode: 400,
                error: "Company not found!"
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

const createCompany = async (req, res) => {
    try {
        const { id, username } = req.user; // Lấy id và username từ req.user

        // Kiểm tra User có tồn tại hay không
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: "User not found",
            });
        }

        // Tạo một công ty mới
        const newCompany = new Company({
            ...req.body,
            owner: id,  // Gắn owner với ObjectId của user
            ownerUser: username
        });

        // Lưu công ty mới vào database
        const savedCompany = await newCompany.save();

        // Cập nhật danh sách công ty của user
        await User.updateOne(
            { _id: id }, // Sử dụng _id (ObjectId) để tìm user
            { $push: { companies: savedCompany._id } } // Thêm id của công ty vào danh sách
        );

        return res.status(200).json({
            statusCode: 200,
            data: savedCompany,
        });
    } catch (error) {
        console.error("Create Company Error:", error.message);
        return res.status(400).json({
            statusCode: 400,
            error: error.message,
        });
    }
};

export const CompanyController = {
    getCompany,
    createCompany,
    getCompanyById,
    deleteCompany,
    updateCompany
}