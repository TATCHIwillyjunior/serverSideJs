import express from "express"
import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
} from "../controllers/studentsController.js"

const router = express.Router()

router.get("/", getStudentsController)
router.get("/:id", getStudentByIdController)
router.post("/", createStudentController)
router.put("/:id", updateStudentController)
router.delete("/:id", deleteStudentController)

export default router
