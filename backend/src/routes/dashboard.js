
import express from "express";

import { DashboardController } from "../controllers/dashboardController.js"

const router = express.Router();


router.get("/dashboard", DashboardController.totalJobSubmited);

export default router;
