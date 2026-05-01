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

export function getAllProfessors() {
  return readDB().professors
}

export function getProfessorById(id) {
  return readDB().professors.find(p => p.id === id)
}

export function createProfessor(data) {
  const db = readDB()
  const newId = data.id ?? Math.max(...db.professors.map(p => p.id)) + 1
  const newProfessor = { ...data, id: newId }
  db.professors.push(newProfessor)
  writeDB(db)
  return newProfessor
}

export function updateProfessor(id, data) {
  const db = readDB()
  const index = db.professors.findIndex(p => p.id === id)
  db.professors[index] = { ...db.professors[index], ...data, id }
  writeDB(db)
  return db.professors[index]
}

export function deleteProfessor(id) {
  const db = readDB()
  db.professors = db.professors.filter(p => p.id !== id)
  writeDB(db)
}