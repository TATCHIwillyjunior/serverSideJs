import Professor from "../models/professor_db.js"

export function getAllProfessors() {
  return Professor.find().lean()
}

export function getProfessorById(id) {
  return Professor.findById(id).lean()
}

export async function createProfessor(data) {
  const doc = await Professor.create(data)
  return doc.toObject()
}

export function updateProfessor(id, data) {
  return Professor.findByIdAndUpdate(id, data, { new: true }).lean()
}

export function deleteProfessor(id) {
  return Professor.findByIdAndDelete(id)
}