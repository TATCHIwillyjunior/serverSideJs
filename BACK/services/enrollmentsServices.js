import Enrollment from "../models/enrollment_db.js"

const populate = [
  { path: "student_id", populate: { path: "school_id" } },
  { path: "course_id",  populate: [{ path: "professor_id" }, { path: "room_id" }] }
]

export function getAllEnrollments() {
  return Enrollment.find().populate(populate).lean()
}

export function getEnrollmentById(id) {
  return Enrollment.findById(id).populate(populate).lean()
}

export function getEnrollmentsByStudent(studentId) {
  return Enrollment.find({ student_id: studentId }).populate(populate).lean()
}

export async function createEnrollment(data) {
  const doc = await Enrollment.create(data)
  return Enrollment.findById(doc._id).populate(populate).lean()
}

export function deleteEnrollment(id) {
  return Enrollment.findByIdAndDelete(id)
}