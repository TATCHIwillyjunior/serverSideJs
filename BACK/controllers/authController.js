import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getAllStudents } from "../services/studentsServices.js"
import { toDTO } from "./studentsController.js"

export async function loginController(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "❌ Email and password are required." })
  }

  const student = getAllStudents().find(s => s.email === email)
  if (!student) {
    return res.status(401).json({ error: "❌ Invalid credentials." })
  }

  const match = await bcrypt.compare(password, student.password)
  if (!match) {
    return res.status(401).json({ error: "❌ Invalid credentials." })
  }

  const token = jwt.sign(
    { id: student.id, email: student.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )

  res.json({ token, student: toDTO(student) })
}