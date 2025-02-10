"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var middleware = function middleware() {
  var requiredRoles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (req, res, next) {
    var authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(401).json({
        statusCode: 401,
        message: "Authorization header is missing"
      });
    }
    var token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Token is missing"
      });
    }
    _jsonwebtoken["default"].verify(token, process.env.JWTTOKENSECRET, function (err, user) {
      if (err) {
        return res.status(403).json({
          statusCode: 403,
          message: "Token is invalid or expired"
        });
      }
      req.user = user;
      console.log(user.role, "user");
      console.log(requiredRoles, "requiredRoles");
      if (requiredRoles.length > 0 && !requiredRoles.some(function (role) {
        return new Set(user.role).has(role);
      })) {
        return res.status(403).json({
          statusCode: 403,
          message: "You do not have permission to access this resource"
        });
      }
      next(); // Tiếp tục xử lý request
    });
  };
};
var _default = exports["default"] = middleware;