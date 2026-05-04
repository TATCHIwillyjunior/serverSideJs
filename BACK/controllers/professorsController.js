import {
  getAllProfessors,
  createProfessor,
  updateProfessor,
  deleteProfessor
} from "../services/professorsServices.js"

export async function getProfessorsController(req, res) {
  try {
    res.json(await getAllProfessors())
  } catch {
    res.status(500).json({ error: "❌ Failed to fetch professors." })
  }
}

export function getProfessorByIdController(req, res) {
  res.json(req.professor)
}

export async function createProfessorController(req, res) {
  try {
    const newProfessor = await createProfessor(req.body)
    res.status(201).json({ msg: "✅ Professor created successfully", professor: newProfessor })
  } catch {
    res.status(500).json({ error: "❌ Failed to create professor." })
  }
}

export async function updateProfessorController(req, res) {
  try {
    const updated = await updateProfessor(req.params.id, req.body)
    res.json({ msg: "✅ Professor updated successfully", professor: updated })
  } catch {
    res.status(500).json({ error: "❌ Failed to update professor." })
  }
}

export async function deleteProfessorController(req, res) {
  try {
    await deleteProfessor(req.params.id)
    res.json({ msg: "✅ Professor deleted successfully" })
  } catch {
    res.status(500).json({ error: "❌ Failed to delete professor." })
  }
}