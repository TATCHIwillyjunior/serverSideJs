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

// Explanation of the routes:
                                                                                                                                     
  // - GET /students — just reading a list, no harm in anyone seeing it                                                                 
  // - POST /students — this is register. The user doesn't have a token yet because they haven't been created. You can't ask someone to
  // log in before they have an account.




// Protected routes

// Explanation of the routes:
  // - GET /students/:id — this is reading a specific student's details. We can allow anyone to read the list of students, but we might want to protect the details of each student.
  // - PUT /students/:id — this is updating a student's details. We want to make sure only the student themselves (or an admin) can update their information.
  // - DELETE /students/:id — this is deleting a student's account. Again, we want to make sure only the student themselves (or an admin) can delete their account.

studentRouter.get("/", authenticate, getStudentsController)
studentRouter.get("/:id", authenticate, validateStudentId, getStudentByIdController)
studentRouter.post("/",authenticate, validateStudentBody, validatePassword, hashPassword, createStudentController)
studentRouter.put("/:id", authenticate, validateStudentId, validateStudentBody, validatePassword, hashPassword, updateStudentController)
studentRouter.delete("/:id", authenticate, validateStudentId, deleteStudentController)

export default studentRouter
