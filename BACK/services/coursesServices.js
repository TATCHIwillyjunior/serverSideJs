import Course from "../models/course_db.js"

export function getAllCourses() {
  return Course.find().lean()
}

export function getCourseById(id) {
  return Course.findById(id).lean()
}

export async function createCourse(data) {
  const doc = await Course.create(data)
  return doc.toObject()
}

export function updateCourse(id, data) {
  return Course.findByIdAndUpdate(id, data, { new: true }).lean()
}

export function deleteCourse(id) {
  return Course.findByIdAndDelete(id)
}