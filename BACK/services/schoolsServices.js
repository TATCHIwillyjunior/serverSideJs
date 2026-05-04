import School from "../models/school_db.js"

export function getAllSchools() {
  return School.find().lean()
}

export function getSchoolById(id) {
  return School.findById(id).lean()
}

export async function createSchool(data) {
  const doc = await School.create(data)
  return doc.toObject()
}

export function updateSchool(id, data) {
  return School.findByIdAndUpdate(id, data, { new: true }).lean()
}

export function deleteSchool(id) {
  return School.findByIdAndDelete(id)
}