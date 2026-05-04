import jwt from "jsonwebtoken"
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "../services/studentsServices.js"

export function toDTO(student) {
  const { password, ...dto } = student
  return dto
}

// GET all students
export async function getStudentsController(req, res) {
  try {
    const students = await getAllStudents()
    res.json(students.map(toDTO))
  } catch {
    res.status(500).json({ error: "❌ Failed to fetch students." })
  }
}

// GET student by ID
export function getStudentByIdController(req, res) {
  res.json(toDTO(req.student))
}

// POST create a new student — returns JWT + DTO
export async function createStudentController(req, res) {
  try {
    const newStudent = await createStudent(req.body)
    const token = jwt.sign(
      { id: newStudent._id, email: newStudent.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )
    res.status(201).json({
      msg: "✅ Student created successfully",
      token,
      student: toDTO(newStudent)
    })
  } catch {
    res.status(500).json({ error: "❌ Failed to create student." })
  }
}

// PUT update a student — returns DTO
export async function updateStudentController(req, res) {
  try {
    const updated = await updateStudent(req.params.id, req.body)
    res.json({
      msg: "✅ Student updated successfully",
      student: toDTO(updated)
    })
  } catch {
    res.status(500).json({ error: "❌ Failed to update student." })
  }
}

// DELETE a student
export async function deleteStudentController(req, res) {
  try {
    await deleteStudent(req.params.id)
    res.json({ msg: "✅ Student deleted successfully" })
  } catch {
    res.status(500).json({ error: "❌ Failed to delete student." })
  }
}