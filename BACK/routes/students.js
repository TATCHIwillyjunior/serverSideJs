import express from "express"
import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
} from "../controllers/studentsController.js"
import { validateStudentBody, validateStudentId } from "../middleware/validation.js"
import { validatePassword } from "../middleware/validation.js"
import { hashPassword } from "../middleware/hashPassword.js"

const studentRouter = express.Router()

studentRouter.get("/", getStudentsController)
studentRouter.get("/:id", validateStudentId, getStudentByIdController)
studentRouter.post("/", validateStudentBody, validatePassword, hashPassword, createStudentController)
studentRouter.put("/:id", validateStudentId, validateStudentBody, validatePassword, hashPassword, updateStudentController)
studentRouter.delete("/:id", validateStudentId, deleteStudentController)

export default studentRouter
