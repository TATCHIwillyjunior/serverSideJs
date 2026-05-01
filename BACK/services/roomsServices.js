import { readFileSync, writeFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DATA_PATH = join(__dirname, "../db.json")

function readDB() {
  return JSON.parse(readFileSync(DATA_PATH, "utf-8"))
}

function writeDB(db) {
  writeFileSync(DATA_PATH, JSON.stringify(db, null, 2))
}

export function getAllRooms() {
  return readDB().rooms
}

export function getRoomById(id) {
  return readDB().rooms.find(r => r.id === id)
}

export function createRoom(data) {
  const db = readDB()
  const newId = data.id ?? Math.max(...db.rooms.map(r => r.id)) + 1
  const newRoom = { ...data, id: newId }
  db.rooms.push(newRoom)
  writeDB(db)
  return newRoom
}

export function updateRoom(id, data) {
  const db = readDB()
  const index = db.rooms.findIndex(r => r.id === id)
  db.rooms[index] = { ...db.rooms[index], ...data, id }
  writeDB(db)
  return db.rooms[index]
}

export function deleteRoom(id) {
  const db = readDB()
  db.rooms = db.rooms.filter(r => r.id !== id)
  writeDB(db)
}