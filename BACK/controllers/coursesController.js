import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from "../services/coursesServices.js"

export async function getCoursesController(req, res) {
  try {
    res.json(await getAllCourses())
  } catch {
    res.status(500).json({ error: "❌ Failed to fetch courses." })
  }
}

export function getCourseByIdController(req, res) {
  res.json(req.course)
}

export async function createCourseController(req, res) {
  try {
    const newCourse = await createCourse(req.body)
    res.status(201).json({ msg: "✅ Course created successfully", course: newCourse })
  } catch {
    res.status(500).json({ error: "❌ Failed to create course." })
  }
}

export async function updateCourseController(req, res) {
  try {
    const updated = await updateCourse(req.params.id, req.body)
    res.json({ msg: "✅ Course updated successfully", course: updated })
  } catch {
    res.status(500).json({ error: "❌ Failed to update course." })
  }
}

export async function deleteCourseController(req, res) {
  try {
    await deleteCourse(req.params.id)
    res.json({ msg: "✅ Course deleted successfully" })
  } catch {
    res.status(500).json({ error: "❌ Failed to delete course." })
  }
}