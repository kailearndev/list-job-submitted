"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController.js");
var _middleware = _interopRequireDefault(require("../middleware/middleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get("/user", (0, _middleware["default"])(["admin"]), _userController.UserController.getUser);
router.get("/user/:id", (0, _middleware["default"])(["admin"]), _userController.UserController.getUserById);
router["delete"]("/user/:id", (0, _middleware["default"])(["admin"]), _userController.UserController.deleteUser);
router.put("/user/:id", (0, _middleware["default"])(["admin", "user"]), _userController.UserController.updateUser);
router.post("/user", (0, _middleware["default"])(["admin"]), _userController.UserController.createUser);
var _default = exports["default"] = router;