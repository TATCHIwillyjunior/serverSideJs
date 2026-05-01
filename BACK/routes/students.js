import express from "express"
import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
} from "../controllers/studentsController.js"
import { validateStudentBody, validateStudentId, validatePassword } from "../middleware/validation.js"
import { hashPassword } from "../middleware/hashPassword.js"
import { authenticate } from "../middleware/auth.js"

const studentRouter = express.Router()

// Public routes
studentRouter.get("/", getStudentsController)
studentRouter.post("/", validateStudentBody, validatePassword, hashPassword, createStudentController)

// Protected routes
studentRouter.get("/:id", authenticate, validateStudentId, getStudentByIdController)
studentRouter.put("/:id", authenticate, validateStudentId, validateStudentBody, validatePassword, hashPassword, updateStudentController)
studentRouter.delete("/:id", authenticate, validateStudentId, deleteStudentController)

export default studentRouter
