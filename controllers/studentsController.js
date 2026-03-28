import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../services/studentsServices.js"

export function getStudentsController(req, res) {
  res.json(getAllStudents())
}

export function getStudentByIdController(req, res) {
  const id = parseInt(req.params.id)
  const student = getStudentById(id)

  if (!student) {
    return res.status(404).json({ error: "❌ Student not found" })
  }

  res.json(student)
}

export function createStudentController(req, res) {
  const newStudent = createStudent(req.body)
  res.status(201).json({
    msg: "✅ Student created successfully",
    student: newStudent
  })
}

export function updateStudentController(req, res) {
  const id = parseInt(req.params.id)
  const student = getStudentById(id)

  if (!student) {
    return res.status(404).json({ error: "❌ Student not found" })
  } else {
  const updated = updateStudent(id, req.body)
  res.json({
    msg: "✅ Student updated successfully",
    student: updated
  })
  }
}

export function deleteStudentController(req, res) {
  const id = parseInt(req.params.id)
  const student = getStudentById(id)

  if (!student) {
    return res.status(404).json({ error: "❌ Student not found" })
  } else {

  deleteStudent(id)
  res.json({ msg: "✅ Student deleted successfully" })
  }
}
