// src/controllers/authController.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registerSchema } from "../schemas/authSchema.js"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import responseHandler from "../ultils/responseHandle.js"
dotenv.config();

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        //check user exist
        const user = await User.findOne({
            username
        })
        if (!user) {
            return responseHandler(res, 400, "User is not found")
            // return res.status(400).json({
            //     statusCode: 400,
            //     error: "User is not found"
            // })
        }

        //compare pass from user iput db
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return responseHandler(res, 400, "Password invalid"
            )
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role, id: user._id }, process.env.JWTTOKENSECRET, {
            expiresIn: "1d" // Token hết hạn sau 60s
        });

        return res.json({
            role: user.role,
            accessToken
        });

    } catch (error) {
        console.error("Login error:", error.message);
        return responseHandler(res,
            500,
            "Internal server error",
        );

    }
};

const signup = async (req, res) => {
    try {
        const { username, password, logo, role } = req.body;

        const { error } = registerSchema.validate(req.body, { abortEarly: false }) // check error

        if (error) {
            const messages = error.details.map((dt) => dt.message)
            return responseHandler(res, 400, messages)


        }

        const userExsited = await User.findOne({
            username: username
        })
        if (userExsited) {
            return responseHandler(res,
                400,
                "User is existed"
            )
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            password: hashPassword,
            logo,
            role: role || 'user'
        })

        return responseHandler(res,
            200,
            undefined,
            {
                username: user.username,
                role: user.role

            }
        )


    } catch (error) {
        console.error("Login error:", error.message);
        return responseHandler(
            500,
            "Internal server error",
        )
    }

};
const getMe = async (req, res) => {
    try {
        const { username } = req.user
        const userExsited = await User.findOne({
            username
        }).select("username name _id role")

        return responseHandler(res,
            200,
            undefined,
            userExsited
        )


    } catch (error) {
        console.error("Login error:", error.message);
        return responseHandler(
            500,
            "Internal server error",
        )
    }

};


export default {
    login,
    signup,
    getMe
};
