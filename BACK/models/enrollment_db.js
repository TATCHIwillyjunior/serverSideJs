import mongoose from "mongoose"

const enrollmentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  course_id:  { type: mongoose.Schema.Types.ObjectId, ref: "Course",  required: true }
}, { timestamps: true })

enrollmentSchema.index({ student_id: 1, course_id: 1 }, { unique: true })

const Enrollment = mongoose.model("Enrollment", enrollmentSchema)

export default Enrollment