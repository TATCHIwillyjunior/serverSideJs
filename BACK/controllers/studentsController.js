import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../services/studentsServices.js"


// Controller functions for handling student-related requests

// GET all students
export const getStudentsController = async (req, res) => {
  // Avoid sending all data of students, especially the password even though it's encrypted, in the response. 
  // Instead, we can return only the necessary information about each student. 
  // This way, we can protect sensitive information while still providing useful data to the users.
  try {
    const students =  await getAllStudents()

    // Create DTO
    const studentsDTO = students.map((student) => ({
      id: student.id,
      email: student.email
    }))
    res.status(200).json(studentsDTO)
  } catch (error) {
    res.status(404).json({ msg: "Error fetching students" })
  }
}


// GET student by ID
export function getStudentByIdController(req, res) {
  res.json(req.student)
}

////// POST or CREATE a new student

/// 🚨🚨🚨🚨 FOR THE PURPOSE OF DEVELOPMENT THE PASSWORD WILL BE MADE PUBLIC 🚨🚨 -----> NO MORE Public as it's encrypted
//
// ******************************************************************************************************
// *  1. In Later changes, password will be hashed and not stored in plain text,                       **
// *     and the API will not return the password in the response when creating or                     **
// *     retrieving student data.                                                                      **
// ******************************************************************************************************
// ** - ✅ password will be hashed and not stored in plain text                                        **
// ** - ❌ API will not return the password in the response when creating or retrieving student data.  **
// *******************************************************************************************************
//
// ****************************************************************************************************************
// *  2. The password associated to each student in the test Json file (being students.json) will be changed      * ----> Passwords has been changed before the hashing
// ****************************************************************************************************************
// ** - ✅ The password associated to each student in the test Json file (being students.json) has been changed  **
// ****************************************************************************************************************
//


// further improvement could be checking if the new student data is valid (e.g., has required fields like name, age, etc.) before creating the student.
// If the data is invalid, I return a 400 Bad Request error with a message indicating what is wrong with the data. This would make the API more robust and user-friendly.
// also
// checking if a student with the same ID already exists before creating a new student. If a student with the same ID exists,
// I return a 409 Conflict error to indicate that the request could not be completed due to a conflict with the current state of the resource.

export function createStudentController(req, res) {

  // Valided if what enter by student inside the body is valid. Checks if it goes against the validation rules defined in the validateStudentBody
  // middleware function and return an error response with appropriate status code and message.
  const newStudent = createStudent(req.body)
  res.status(201).json({
    msg: "✅ Student created successfully",
    student: newStudent
  })
}

// PUT update a student
export function updateStudentController(req, res) {
  const updated = updateStudent(parseInt(req.params.id), req.body)
  res.json({
    msg: "✅ Student updated successfully",
    student: updated
  })
}

// DELETE a student
export function deleteStudentController(req, res) {
  deleteStudent(parseInt(req.params.id))
  res.json({ msg: "✅ Student deleted successfully" })
}
