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

export function getAllCourses() {
  return readDB().courses
}

export function getCourseById(id) {
  return readDB().courses.find(c => c.id === id)
}

export function createCourse(data) {
  const db = readDB()
  const newId = data.id ?? Math.max(...db.courses.map(c => c.id)) + 1
  const newCourse = { ...data, id: newId }
  db.courses.push(newCourse)
  writeDB(db)
  return newCourse
}

export function updateCourse(id, data) {
  const db = readDB()
  const index = db.courses.findIndex(c => c.id === id)
  db.courses[index] = { ...db.courses[index], ...data, id }
  writeDB(db)
  return db.courses[index]
}

export function deleteCourse(id) {
  const db = readDB()
  db.courses = db.courses.filter(c => c.id !== id)
  writeDB(db)
}