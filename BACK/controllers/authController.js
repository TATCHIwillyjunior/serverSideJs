import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Student from "../models/student_db.js"
import { toDTO } from "./studentsController.js"

export async function loginController(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "❌ Email and password are required." })
  }

  const student = await Student.findOne({ email }).lean()
  if (!student) {
    return res.status(401).json({ error: "❌ Invalid credentials." })
  }

  const match = await bcrypt.compare(password, student.password)
  if (!match) {
    return res.status(401).json({ error: "❌ Invalid credentials." })
  }

  const token = jwt.sign(
    { id: student._id, email: student.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )

  res.json({ token, student: toDTO(student) })
}