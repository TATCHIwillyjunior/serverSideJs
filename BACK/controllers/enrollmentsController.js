import {
  getAllEnrollments,
  getEnrollmentsByStudent,
  createEnrollment,
  deleteEnrollment
} from "../services/enrollmentsServices.js"

export async function getEnrollmentsController(req, res) {
  try {
    res.json(await getAllEnrollments())
  } catch {
    res.status(500).json({ error: "❌ Failed to fetch enrollments." })
  }
}

export function getEnrollmentByIdController(req, res) {
  res.json(req.enrollment)
}

export async function getEnrollmentsByStudentController(req, res) {
  try {
    const { studentId } = req.params
    res.json(await getEnrollmentsByStudent(studentId))
  } catch {
    res.status(500).json({ error: "❌ Failed to fetch enrollments for student." })
  }
}

export async function createEnrollmentController(req, res) {
  try {
    const enrollment = await createEnrollment(req.body)
    res.status(201).json({ msg: "✅ Enrollment created successfully", enrollment })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "❌ Student is already enrolled in this course." })
    }
    res.status(500).json({ error: "❌ Failed to create enrollment." })
  }
}

export async function deleteEnrollmentController(req, res) {
  try {
    await deleteEnrollment(req.params.id)
    res.json({ msg: "✅ Enrollment deleted successfully" })
  } catch {
    res.status(500).json({ error: "❌ Failed to delete enrollment." })
  }
}