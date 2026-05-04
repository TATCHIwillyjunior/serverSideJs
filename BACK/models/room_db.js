import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({
  number:   { type: String, required: true },
  building: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  type:     { type: String, required: true }
}, { timestamps: true })

const Room = mongoose.model("Room", roomSchema)

export default Room