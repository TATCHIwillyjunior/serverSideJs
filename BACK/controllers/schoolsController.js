import {
  getAllSchools,
  createSchool,
  updateSchool,
  deleteSchool
} from "../services/schoolsServices.js"

export async function getSchoolsController(req, res) {
  try {
    res.json(await getAllSchools())
  } catch {
    res.status(500).json({ error: "❌ Failed to fetch schools." })
  }
}

export function getSchoolByIdController(req, res) {
  res.json(req.school)
}

export async function createSchoolController(req, res) {
  try {
    const newSchool = await createSchool(req.body)
    res.status(201).json({ msg: "✅ School created successfully", school: newSchool })
  } catch {
    res.status(500).json({ error: "❌ Failed to create school." })
  }
}

export async function updateSchoolController(req, res) {
  try {
    const updated = await updateSchool(req.params.id, req.body)
    res.json({ msg: "✅ School updated successfully", school: updated })
  } catch {
    res.status(500).json({ error: "❌ Failed to update school." })
  }
}

export async function deleteSchoolController(req, res) {
  try {
    await deleteSchool(req.params.id)
    res.json({ msg: "✅ School deleted successfully" })
  } catch {
    res.status(500).json({ error: "❌ Failed to delete school." })
  }
}