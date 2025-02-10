"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = _interopRequireDefault(require("../controllers/authController.js"));
var _middleware = _interopRequireDefault(require("../middleware/middleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// src/routes/authRoutes.js

// Import controller

var router = _express["default"].Router();

// Định nghĩa route đăng nhập
router.post("/login", _authController["default"].login);
router.post("/signup", _authController["default"].signup);
router.get("/me", (0, _middleware["default"])([]), _authController["default"].getMe);
var _default = exports["default"] = router;