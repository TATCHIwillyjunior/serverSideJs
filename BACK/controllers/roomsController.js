import {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom
} from "../services/roomsServices.js"

export function getRoomsController(req, res) {
  res.json(getAllRooms())
}

export function getRoomByIdController(req, res) {
  res.json(req.room)
}

export function createRoomController(req, res) {
  const newRoom = createRoom(req.body)
  res.status(201).json({
    msg: "✅ Room created successfully",
    room: newRoom
  })
}

export function updateRoomController(req, res) {
  const updated = updateRoom(parseInt(req.params.id), req.body)
  res.json({
    msg: "✅ Room updated successfully",
    room: updated
  })
}

export function deleteRoomController(req, res) {
  deleteRoom(parseInt(req.params.id))
  res.json({ msg: "✅ Room deleted successfully" })
}