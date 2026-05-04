import {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom
} from "../services/roomsServices.js"

export async function getRoomsController(req, res) {
  try {
    res.json(await getAllRooms())
  } catch {
    res.status(500).json({ error: "❌ Failed to fetch rooms." })
  }
}

export function getRoomByIdController(req, res) {
  res.json(req.room)
}

export async function createRoomController(req, res) {
  try {
    const newRoom = await createRoom(req.body)
    res.status(201).json({ msg: "✅ Room created successfully", room: newRoom })
  } catch {
    res.status(500).json({ error: "❌ Failed to create room." })
  }
}

export async function updateRoomController(req, res) {
  try {
    const updated = await updateRoom(req.params.id, req.body)
    res.json({ msg: "✅ Room updated successfully", room: updated })
  } catch {
    res.status(500).json({ error: "❌ Failed to update room." })
  }
}

export async function deleteRoomController(req, res) {
  try {
    await deleteRoom(req.params.id)
    res.json({ msg: "✅ Room deleted successfully" })
  } catch {
    res.status(500).json({ error: "❌ Failed to delete room." })
  }
}