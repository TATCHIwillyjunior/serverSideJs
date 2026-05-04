import mongoose from "mongoose"
import { getStudentById } from "../services/studentsServices.js"
import Student from "../models/student_db.js"

export function logRequest(req, _res, next) {
  console.log(`${req.method} ${req.url}`)
  next()
}

export async function validateStudentId(req, res, next) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "❌ ID must be a valid MongoDB ObjectId." })
  }

  const student = await getStudentById(id)
  if (!student) {
    return res.status(404).json({ error: "❌❌ Student was not found" })
  }

  req.student = student
  next()
}

export async function validateStudentBody(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "❌ Request body is missing or not valid JSON. Make sure to set Content-Type: application/json." })
  }

  const { name, email, major, gpa } = req.body

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "❌ 'name' is required and must be a non-empty string." })
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "❌ 'email' is required and must be a valid email address." })
  }

  if (!major || typeof major !== "string" || major.trim() === "") {
    return res.status(400).json({ error: "❌ 'major' is required and must be a non-empty string." })
  }

  if (gpa === undefined || gpa === null) {
    return res.status(400).json({ error: "❌ 'gpa' is required." })
  }

  const parsedGpa = parseFloat(gpa)
  if (isNaN(parsedGpa) || parsedGpa < 0 || parsedGpa > 4) {
    return res.status(400).json({ error: "❌ 'gpa' must be a number between 0 and 4." })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "❌ 'email' must be a valid email address." })
  }

  // Check for duplicate email (skip own email on PUT)
  const currentId = req.student ? req.student._id.toString() : null
  const existing = await Student.findOne({ email }).lean()
  if (existing && existing._id.toString() !== currentId) {
    return res.status(409).json({ error: "❌ A student with this email already exists." })
  }

  next()
}

export function validatePassword(req, res, next) {
  const { password } = req.body

  if (req.method === "POST") {
    if (!password || typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({ error: "❌ 'password' is required for new students." })
    }
  }

  if (password && password.length < 6) {
    return res.status(400).json({ error: "❌ Password must be at least 6 characters long." })
  }

  next()
}

export function handleJsonParseError(err, req, res, next) {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "❌ Invalid JSON in request body." })
  }
  next(err)
}