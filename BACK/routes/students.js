import express from "express"
import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
} from "../controllers/studentsController.js"

const studentRouter = express.Router()

studentRouter.get("/", getStudentsController)
studentRouter.get("/:id", getStudentByIdController)
studentRouter.post("/", createStudentController)
studentRouter.put("/:id", updateStudentController)
studentRouter.delete("/:id", deleteStudentController)

export default studentRouter
