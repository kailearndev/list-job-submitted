"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Định nghĩa schema cho Company
var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  logo: {
    type: String
  },
  role: {
    type: [String],
    "enum": ["user", "admin"],
    // Các role được định nghĩa
    "default": "user" // Mặc định là user
  },
  companies: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Company" // Reference tới model Company
  }]
}, {
  timestamps: true,
  versionKey: false
});

// Export trực tiếp model
var _default = exports["default"] = _mongoose["default"].model("user", userSchema);