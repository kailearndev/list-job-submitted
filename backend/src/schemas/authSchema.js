import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().required().trim().messages({
        "any.required": "Username is required",
        "string.trim": "Username is not empty space",
        "string.empty": "Username is not empty",

    }),

    password: Joi.string().required().min(6).messages({
        "any.required": "Password is required",
        "any.min": "Password is min {#limit} character",
        "string.empty": "Password is not empty",
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        "any.required": "Confirm Password is required",
        "any.only": "Confirm Password is not match password",
        "string.empty": "Confirm Password is not empty",
    }),
    role: Joi.array().items(Joi.string().valid("admin", "user")).default(["user"]) // Thêm role


})