import mongoose from "mongoose"
import { getEnrollmentById } from "../services/enrollmentsServices.js"
import { getStudentById } from "../services/studentsServices.js"
import { getCourseById } from "../services/coursesServices.js"

export async function validateEnrollmentId(req, res, next) {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "❌ ID must be a valid MongoDB ObjectId." })
  }
  const enrollment = await getEnrollmentById(id)
  if (!enrollment) {
    return res.status(404).json({ error: "❌ Enrollment not found." })
  }
  req.enrollment = enrollment
  next()
}

export async function validateEnrollmentBody(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "❌ Request body is missing or not valid JSON." })
  }

  const { student_id, course_id } = req.body

  if (!student_id || !mongoose.Types.ObjectId.isValid(student_id)) {
    return res.status(400).json({ error: "❌ 'student_id' is required and must be a valid MongoDB ObjectId." })
  }

  if (!course_id || !mongoose.Types.ObjectId.isValid(course_id)) {
    return res.status(400).json({ error: "❌ 'course_id' is required and must be a valid MongoDB ObjectId." })
  }

  const student = await getStudentById(student_id)
  if (!student) {
    return res.status(404).json({ error: "❌ Student not found." })
  }

  const course = await getCourseById(course_id)
  if (!course) {
    return res.status(404).json({ error: "❌ Course not found." })
  }

  next()
}