import studentsData from "../students.json" with { type: "json" }

export function getAllStudents() {
  return studentsData
}

export function getStudentById(id) {
  return studentsData.find(s => s.id === id)
}

export function createStudent(data) {
  return data    // Return the created student object
}

export function updateStudent(id, data) {
  return data   // Return the updated student object
}

export function deleteStudent(id) {
  return true   // Return true to indicate successful deletion
}
