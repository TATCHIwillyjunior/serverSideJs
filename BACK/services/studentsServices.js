import { readFileSync, writeFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DATA_PATH = join(__dirname, "../students.json")

function readData() {
    return JSON.parse(readFileSync(DATA_PATH, "utf-8"))
}

function writeData(data) {
    writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}

export function getAllStudents() {
    return readData()
}

export function getStudentById(id) {
    return readData().find(s => s.id === id)
}

export function createStudent(data) {
    const students = readData()
    const newId = data.id ?? Math.max(...students.map(s => s.id)) + 1
    const newStudent = { ...data, id: newId }
    students.push(newStudent)
    writeData(students)
    return newStudent
}

export function updateStudent(id, data) {
    const students = readData()
    const index = students.findIndex(s => s.id === id)
    students[index] = { ...students[index], ...data, id }
    writeData(students)
    return students[index]
}

export function deleteStudent(id) {
    const students = readData()
    const filtered = students.filter(s => s.id !== id)
    writeData(filtered)
}