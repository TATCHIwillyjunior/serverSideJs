import express from "express"
import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
} from "../controllers/studentsController.js"
import { validateStudentBody, validateStudentId } from "../middleware/middleware.js"

const studentRouter = express.Router()

studentRouter.get("/", getStudentsController)
studentRouter.get("/:id", validateStudentId, getStudentByIdController)
studentRouter.post("/", validateStudentBody, createStudentController)
studentRouter.put("/:id", validateStudentId, validateStudentBody, updateStudentController)
studentRouter.delete("/:id", validateStudentId, deleteStudentController)

export default studentRouter
