"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var registerSchema = exports.registerSchema = _joi["default"].object({
  username: _joi["default"].string().required().trim().messages({
    "any.required": "Username is required",
    "string.trim": "Username is not empty space",
    "string.empty": "Username is not empty"
  }),
  password: _joi["default"].string().required().min(6).messages({
    "any.required": "Password is required",
    "any.min": "Password is min {#limit} character",
    "string.empty": "Password is not empty"
  }),
  confirmPassword: _joi["default"].string().required().valid(_joi["default"].ref('password')).messages({
    "any.required": "Confirm Password is required",
    "any.only": "Confirm Password is not match password",
    "string.empty": "Confirm Password is not empty"
  }),
  role: _joi["default"].array().items(_joi["default"].string().valid("admin", "user"))["default"](["user"]) // Thêm role
});