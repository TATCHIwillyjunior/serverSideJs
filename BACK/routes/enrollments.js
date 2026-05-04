import express from "express"
import {
  getEnrollmentsController,
  getEnrollmentByIdController,
  getEnrollmentsByStudentController,
  createEnrollmentController,
  deleteEnrollmentController
} from "../controllers/enrollmentsController.js"
import { validateEnrollmentId, validateEnrollmentBody } from "../middleware/enrollmentValidation.js"
import { authenticate } from "../middleware/auth.js"

const enrollmentRouter = express.Router()

// Public routes — /student/:studentId must come before /:id


// Protected routes
enrollmentRouter.get("/", authenticate, getEnrollmentsController)
enrollmentRouter.get("/student/:studentId", authenticate, getEnrollmentsByStudentController)
enrollmentRouter.get("/:id", authenticate, validateEnrollmentId, getEnrollmentByIdController)
enrollmentRouter.post("/", authenticate, validateEnrollmentBody, createEnrollmentController)
enrollmentRouter.delete("/:id", authenticate, validateEnrollmentId, deleteEnrollmentController)

export default enrollmentRouter