import mongoose from "mongoose"
import { getCourseById } from "../services/coursesServices.js"
import { getProfessorById } from "../services/professorsServices.js"
import { getRoomById } from "../services/roomsServices.js"

export async function validateCourseId(req, res, next) {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "❌ ID must be a valid MongoDB ObjectId." })
  }
  const course = await getCourseById(id)
  if (!course) {
    return res.status(404).json({ error: "❌ Course not found." })
  }
  req.course = course
  next()
}

export async function validateCourseBody(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "❌ Request body is missing or not valid JSON. Make sure to set Content-Type: application/json." })
  }

  const { title, description, credits, professor_id, room_id } = req.body

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "❌ 'title' is required and must be a non-empty string." })
  }

  if (!description || typeof description !== "string" || description.trim() === "") {
    return res.status(400).json({ error: "❌ 'description' is required and must be a non-empty string." })
  }

  if (credits === undefined || credits === null) {
    return res.status(400).json({ error: "❌ 'credits' is required." })
  }
  const parsedCredits = parseInt(credits)
  if (isNaN(parsedCredits) || parsedCredits < 1 || parsedCredits > 6) {
    return res.status(400).json({ error: "❌ 'credits' must be a whole number between 1 and 6." })
  }

  if (!professor_id || !mongoose.Types.ObjectId.isValid(professor_id)) {
    return res.status(400).json({ error: "❌ 'professor_id' must be a valid MongoDB ObjectId." })
  }
  const professor = await getProfessorById(professor_id)
  if (!professor) {
    return res.status(404).json({ error: "❌ Professor not found." })
  }

  if (!room_id || !mongoose.Types.ObjectId.isValid(room_id)) {
    return res.status(400).json({ error: "❌ 'room_id' must be a valid MongoDB ObjectId." })
  }
  const room = await getRoomById(room_id)
  if (!room) {
    return res.status(404).json({ error: "❌ Room not found." })
  }

  next()
}