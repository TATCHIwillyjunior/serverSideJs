import mongoose from "mongoose"

const schoolSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  city:    { type: String, required: true },
  address: { type: String, required: true },
  dean:    { type: String, required: true }
}, { timestamps: true })

const School = mongoose.model("School", schoolSchema)

export default School