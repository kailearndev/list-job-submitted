
import express from "express";
import { CompanyController } from "../controllers/companyController.js";
import middleware from "../middleware/middleware.js";


const router = express.Router()

router.get("/company", CompanyController.getCompany);
router.get(`/company/:id`, CompanyController.getCompanyById);
router.delete(`/company/:id`, CompanyController.deleteCompany);
router.put(`/company/:id`, CompanyController.updateCompany);
router.post("/company", CompanyController.createCompany);



export default router 