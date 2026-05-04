import express from "express"
import {
  getProfessorsController,
  getProfessorByIdController,
  createProfessorController,
  updateProfessorController,
  deleteProfessorController
} from "../controllers/professorsController.js"
import { validateProfessorId, validateProfessorBody } from "../middleware/professorValidation.js"
import { authenticate } from "../middleware/auth.js"

const professorRouter = express.Router()

// Public routes

// Protected routes
professorRouter.get("/", authenticate, getProfessorsController)
professorRouter.get("/:id", authenticate, validateProfessorId, getProfessorByIdController)
professorRouter.post("/", authenticate, validateProfessorBody, createProfessorController)
professorRouter.put("/:id", authenticate, validateProfessorId, validateProfessorBody, updateProfessorController)
professorRouter.delete("/:id", authenticate, validateProfessorId, deleteProfessorController)

export default professorRouter