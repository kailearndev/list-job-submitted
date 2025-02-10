"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _companyController = require("../controllers/companyController.js");
var _middleware = _interopRequireDefault(require("../middleware/middleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get("/company", _companyController.CompanyController.getCompany);
router.get("/company/:id", _companyController.CompanyController.getCompanyById);
router["delete"]("/company/:id", _companyController.CompanyController.deleteCompany);
router.put("/company/:id", _companyController.CompanyController.updateCompany);
router.post("/company", _companyController.CompanyController.createCompany);
var _default = exports["default"] = router;