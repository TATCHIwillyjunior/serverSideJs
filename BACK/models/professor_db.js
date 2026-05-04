import mongoose from "mongoose"

const professorSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  department: { type: String, required: true },
  title:      { type: String, required: true }
}, { timestamps: true })

const Professor = mongoose.model("Professor", professorSchema)

export default Professor