import mongoose from "mongoose"
import { getProfessorById } from "../services/professorsServices.js"
import Professor from "../models/professor_db.js"

export async function validateProfessorId(req, res, next) {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "❌ ID must be a valid MongoDB ObjectId." })
  }
  const professor = await getProfessorById(id)
  if (!professor) {
    return res.status(404).json({ error: "❌ Professor not found." })
  }
  req.professor = professor
  next()
}

export async function validateProfessorBody(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "❌ Request body is missing or not valid JSON. Make sure to set Content-Type: application/json." })
  }

  const { name, email, department, title } = req.body

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "❌ 'name' is required and must be a non-empty string." })
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "❌ 'email' is required and must be a valid email address." })
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "❌ 'email' must be a valid email address." })
  }

  const currentId = req.professor ? req.professor._id.toString() : null
  const existing = await Professor.findOne({ email }).lean()
  if (existing && existing._id.toString() !== currentId) {
    return res.status(409).json({ error: "❌ A professor with this email already exists." })
  }

  if (!department || typeof department !== "string" || department.trim() === "") {
    return res.status(400).json({ error: "❌ 'department' is required and must be a non-empty string." })
  }

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "❌ 'title' is required and must be a non-empty string." })
  }

  next()
}