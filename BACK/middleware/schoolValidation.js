import mongoose from "mongoose"
import { getSchoolById } from "../services/schoolsServices.js"

export async function validateSchoolId(req, res, next) {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "❌ ID must be a valid MongoDB ObjectId." })
  }
  const school = await getSchoolById(id)
  if (!school) {
    return res.status(404).json({ error: "❌ School not found." })
  }
  req.school = school
  next()
}

export function validateSchoolBody(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "❌ Request body is missing or not valid JSON. Make sure to set Content-Type: application/json." })
  }

  const { name, city, address, dean } = req.body

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "❌ 'name' is required and must be a non-empty string." })
  }

  if (!city || typeof city !== "string" || city.trim() === "") {
    return res.status(400).json({ error: "❌ 'city' is required and must be a non-empty string." })
  }

  if (!address || typeof address !== "string" || address.trim() === "") {
    return res.status(400).json({ error: "❌ 'address' is required and must be a non-empty string." })
  }

  if (!dean || typeof dean !== "string" || dean.trim() === "") {
    return res.status(400).json({ error: "❌ 'dean' is required and must be a non-empty string." })
  }

  next()
}