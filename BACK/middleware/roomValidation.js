import { getRoomById } from "../services/roomsServices.js"

export function validateRoomId(req, res, next) {
  const id = parseInt(req.params.id)
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "❌ ID must be a valid positive number." })
  }
  const room = getRoomById(id)
  if (!room) {
    return res.status(404).json({ error: "❌ Room not found." })
  }
  req.room = room
  next()
}

export function validateRoomBody(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "❌ Request body is missing or not valid JSON. Make sure to set Content-Type: application/json." })
  }

  const { number, building, capacity, type } = req.body

  if (!number || typeof number !== "string" || number.trim() === "") {
    return res.status(400).json({ error: "❌ 'number' is required and must be a non-empty string." })
  }

  if (!building || typeof building !== "string" || building.trim() === "") {
    return res.status(400).json({ error: "❌ 'building' is required and must be a non-empty string." })
  }

  if (capacity === undefined || capacity === null) {
    return res.status(400).json({ error: "❌ 'capacity' is required." })
  }
  const parsedCapacity = parseInt(capacity)
  if (isNaN(parsedCapacity) || parsedCapacity < 1) {
    return res.status(400).json({ error: "❌ 'capacity' must be a positive whole number." })
  }

  if (!type || typeof type !== "string" || type.trim() === "") {
    return res.status(400).json({ error: "❌ 'type' is required and must be a non-empty string." })
  }

  next()
}