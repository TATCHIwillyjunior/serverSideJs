import Room from "../models/room_db.js"

export function getAllRooms() {
  return Room.find().lean()
}

export function getRoomById(id) {
  return Room.findById(id).lean()
}

export async function createRoom(data) {
  const doc = await Room.create(data)
  return doc.toObject()
}

export function updateRoom(id, data) {
  return Room.findByIdAndUpdate(id, data, { new: true }).lean()
}

export function deleteRoom(id) {
  return Room.findByIdAndDelete(id)
}