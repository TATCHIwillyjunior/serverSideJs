import jwt from "jsonwebtoken"
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "../services/studentsServices.js"

export function toDTO(student) {
  return { id: student.id, email: student.email }
}

// GET all students
export function getStudentsController(req, res) {
  res.json(getAllStudents().map(toDTO))
}

// GET student by ID
export function getStudentByIdController(req, res) {
  res.json(toDTO(req.student))
}

// POST create a new student — returns JWT + DTO
export function createStudentController(req, res) {
  const newStudent = createStudent(req.body)

  const token = jwt.sign(
    { id: newStudent.id, email: newStudent.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )

  res.status(201).json({
    msg: "✅ Student created successfully",
    token,
    student: toDTO(newStudent)
  })
}

// PUT update a student — returns DTO
export function updateStudentController(req, res) {
  const updated = updateStudent(parseInt(req.params.id), req.body)
  res.json({
    msg: "✅ Student updated successfully",
    student: toDTO(updated)
  })
}

// DELETE a student
export function deleteStudentController(req, res) {
  deleteStudent(parseInt(req.params.id))
  res.json({ 
    msg: "✅ Student deleted successfully" })
}