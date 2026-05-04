import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  major:     { type: String, required: true },
  gpa:       { type: Number, required: true, min: 0, max: 4 },
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: "School" }
}, { timestamps: true })

const Student = mongoose.model("Student", studentSchema)

export default Student