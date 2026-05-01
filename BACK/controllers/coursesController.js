import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from "../services/coursesServices.js"

export function getCoursesController(req, res) {
  res.json(getAllCourses())
}

export function getCourseByIdController(req, res) {
  res.json(req.course)
}

export function createCourseController(req, res) {
  const newCourse = createCourse(req.body)
  res.status(201).json({
    msg: "✅ Course created successfully",
    course: newCourse
  })
}

export function updateCourseController(req, res) {
  const updated = updateCourse(parseInt(req.params.id), req.body)
  res.json({
    msg: "✅ Course updated successfully",
    course: updated
  })
}

export function deleteCourseController(req, res) {
  deleteCourse(parseInt(req.params.id))
  res.json({ msg: "✅ Course deleted successfully" })
}