import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String, required: true },
  credits:      { type: Number, required: true, min: 1, max: 6 },
  professor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Professor", required: true },
  room_id:      { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true }
}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema)

export default Course