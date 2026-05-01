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

export function getAllStudents() {
    return readDB().students
}

export function getStudentById(id) {
    return readDB().students.find(s => s.id === id)
}

export function createStudent(data) {
    const db = readDB()
    const newId = data.id ?? Math.max(...db.students.map(s => s.id)) + 1
    const newStudent = { ...data, id: newId }
    db.students.push(newStudent)
    writeDB(db)
    return newStudent
}

export function updateStudent(id, data) {
    const db = readDB()
    const index = db.students.findIndex(s => s.id === id)
    db.students[index] = { ...db.students[index], ...data, id }
    writeDB(db)
    return db.students[index]
}

export function deleteStudent(id) {
    const db = readDB()
    db.students = db.students.filter(s => s.id !== id)
    writeDB(db)
}