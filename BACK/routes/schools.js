import express from "express"
import {
  getSchoolsController,
  getSchoolByIdController,
  createSchoolController,
  updateSchoolController,
  deleteSchoolController
} from "../controllers/schoolsController.js"
import { validateSchoolId, validateSchoolBody } from "../middleware/schoolValidation.js"
import { authenticate } from "../middleware/auth.js"

const schoolRouter = express.Router()

// Public routes
schoolRouter.get("/", getSchoolsController)
schoolRouter.get("/:id", validateSchoolId, getSchoolByIdController)

// Protected routes
schoolRouter.post("/", authenticate, validateSchoolBody, createSchoolController)
schoolRouter.put("/:id", authenticate, validateSchoolId, validateSchoolBody, updateSchoolController)
schoolRouter.delete("/:id", authenticate, validateSchoolId, deleteSchoolController)

export default schoolRouter