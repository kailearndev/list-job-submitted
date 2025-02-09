
import express from "express";
import { UserController } from "../controllers/userController.js";
import middleware from "../middleware/middleware.js";


const router = express.Router()

router.get("/user", middleware(["admin"]), UserController.getUser)
router.get(`/user/:id`, middleware(["admin"]), UserController.getUserById)
router.delete(`/user/:id`, middleware(["admin"]), UserController.deleteUser)
router.put(`/user/:id`, middleware(["admin", "user"]), UserController.updateUser)
router.post("/user", middleware(["admin"]), UserController.createUser);



export default router 