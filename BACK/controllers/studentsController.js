import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../services/studentsServices.js"


// Controller functions for handling student-related requests

// GET all students
export function getStudentsController(req, res) {
  res.json(getAllStudents())
}

// GET student by ID
export function getStudentByIdController(req, res) {
  const id = parseInt(req.params.id)
  const student = getStudentById(id)

  if (!student) {
    // If student not found, return 404 error
    // but by default it returns 200 status code, showing the GET request work but 200 should show up just for working id's so defining a 404 error makes it more clear and accurate.
    return res.status(404).json({ error: "❌❌ Student was not found" })
  }
  res.json(student)
}

////// POST or CREATE a new student

/// 🚨🚨🚨🚨 FOR THE PURPOSE OF DEVELOPMENT THE PASSWORD WILL BE MADE PUBLIC 🚨🚨
//
// 1. In Later changes, password will be hashed and not stored in plain text, 
//  and the API will not return the password in the response when creating or 
//  retrieving student data. 
// 2. The password associated to each student in the test Json file (being students.json) will be changed
//

// further improvement could be checking if the new student data is valid (e.g., has required fields like name, age, etc.) before creating the student.
// If the data is invalid, I return a 400 Bad Request error with a message indicating what is wrong with the data. This would make the API more robust and user-friendly.
// also
// checking if a student with the same ID already exists before creating a new student. If a student with the same ID exists,
// I return a 409 Conflict error to indicate that the request could not be completed due to a conflict with the current state of the resource.
export function createStudentController(req, res) {
  const newStudent = createStudent(req.body)
  res.status(201).json({
    msg: "✅ Student created successfully",
    student: newStudent
  })
  // In a real application, you would save the new student to the database or JSON file here
  // but here it does not create a new student, it just sends the data back to the client as a response
  // There no changes where made.
}

// PUT update a student
export function updateStudentController(req, res) {
  const id = parseInt(req.params.id)
  const student = getStudentById(id)

  if (!student) { 
    // If student not found, return 404 error
    // but by default it returns 200 status code, showing the PUT request work but 200 should show up just for working id's so defining a 404 error makes it more clear and accurate.
    return res.status(404).json({ error: "❌❌ Student was not found" })
  } else {
  const updated = updateStudent(id, req.body)
  res.json({
    msg: "✅ Student updated successfully",
    student: updated
    // In a real application, you would update the student in the database or JSON file here
    // but here it does not update the student, it just sends the updated data back to the client as a response
    // There no changes where made.
  })
  }
}

// DELETE a student
export function deleteStudentController(req, res) {
  const id = parseInt(req.params.id)
  const student = getStudentById(id)

  if (!student) {
    // If student not found, return 404 error
    // but by default it returns 200 status code, showing the DELETE request work but 200 should show up just for working id's so defining a 404 error makes it more clear and accurate.
    return res.status(404).json({ error: "❌❌ Student was not found" })
  } else {

  deleteStudent(id)
  res.json({ msg: "✅ Student deleted successfully" })
  // In a real application, you would remove the student from the database or JSON file here
  // but here it does not delete the student, it just sends a success message back to the client as a response
  // There no changes where made.
  }
}
