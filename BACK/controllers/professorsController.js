import {
  getAllProfessors,
  createProfessor,
  updateProfessor,
  deleteProfessor
} from "../services/professorsServices.js"

export function getProfessorsController(req, res) {
  res.json(getAllProfessors())
}

export function getProfessorByIdController(req, res) {
  res.json(req.professor)
}

export function createProfessorController(req, res) {
  const newProfessor = createProfessor(req.body)
  res.status(201).json({
    msg: "✅ Professor created successfully",
    professor: newProfessor
  })
}

export function updateProfessorController(req, res) {
  const updated = updateProfessor(parseInt(req.params.id), req.body)
  res.json({
    msg: "✅ Professor updated successfully",
    professor: updated
  })
}

export function deleteProfessorController(req, res) {
  deleteProfessor(parseInt(req.params.id))
  res.json({ msg: "✅ Professor deleted successfully" })
}