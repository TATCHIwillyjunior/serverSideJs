import Student from "../models/student_db.js"

export function getAllStudents() {
  return Student.find().lean()
}

export function getStudentById(id) {
  return Student.findById(id).lean()
}

export async function createStudent(data) {
  const doc = await Student.create(data)
  return doc.toObject()
}

export function updateStudent(id, data) {
  return Student.findByIdAndUpdate(id, data, { new: true }).lean()
}

export function deleteStudent(id) {
  return Student.findByIdAndDelete(id)
}