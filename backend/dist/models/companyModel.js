"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Định nghĩa schema cho Company
var companySchema = new _mongoose["default"].Schema({
  companyName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    "enum": ["sent", "rejected", "failed", "interview"],
    "default": "sent"
  },
  tech: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  submissionDate: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  ownerUser: {
    type: String,
    // Lưu trực tiếp username
    required: true // Bắt buộc nếu username cần lưu ngay từ đầu
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User" // Reference tới model User
  }
}, {
  timestamps: true,
  versionKey: false
});
companySchema.index({
  companyName: 1
});

// Export trực tiếp model
var _default = exports["default"] = _mongoose["default"].model("Company", companySchema);