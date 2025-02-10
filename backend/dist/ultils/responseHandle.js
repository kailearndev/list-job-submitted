"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var responseHandler = function responseHandler(res, statusCode, message, data, error) {
  return res.status(statusCode).json({
    statusCode: statusCode,
    message: message,
    success: statusCode >= 200 && statusCode < 300,
    // Tự động xác định success dựa vào statusCode
    data: data,
    error: error
  });
};
var _default = exports["default"] = responseHandler;