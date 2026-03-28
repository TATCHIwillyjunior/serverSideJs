import studentsData from "../students.json" with { type: "json" }

export function getAllStudents() {
  return studentsData
}

export function getStudentById(id) {
  return studentsData.find(s => s.id === id)
}

export function createStudent(data) {
  return data   
}

export function updateStudent(id, data) {
  return data   
}

export function deleteStudent(id) {
  return true   
}
