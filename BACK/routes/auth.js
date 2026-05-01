import express from "express"
import { loginController } from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post("/login", loginController)

export default authRouter