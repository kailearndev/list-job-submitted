"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _dashboardController = require("../controllers/dashboardController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get("/dashboard", _dashboardController.DashboardController.totalJobSubmited);
var _default = exports["default"] = router;