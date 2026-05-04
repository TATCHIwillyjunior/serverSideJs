import express from "express"
import {
  getCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController
} from "../controllers/coursesController.js"
import { validateCourseId, validateCourseBody } from "../middleware/courseValidation.js"
import { authenticate } from "../middleware/auth.js"

const courseRouter = express.Router()

// Public routes


// Protected routes
courseRouter.get("/", authenticate, getCoursesController)
courseRouter.get("/:id", authenticate, validateCourseId, getCourseByIdController)
courseRouter.post("/", authenticate, validateCourseBody, createCourseController)
courseRouter.put("/:id", authenticate, validateCourseId, validateCourseBody, updateCourseController)
courseRouter.delete("/:id", authenticate, validateCourseId, deleteCourseController)

export default courseRouter