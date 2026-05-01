import express from "express"
import {
  getRoomsController,
  getRoomByIdController,
  createRoomController,
  updateRoomController,
  deleteRoomController
} from "../controllers/roomsController.js"
import { validateRoomId, validateRoomBody } from "../middleware/roomValidation.js"
import { authenticate } from "../middleware/auth.js"

const roomRouter = express.Router()

// Public routes
roomRouter.get("/", getRoomsController)
roomRouter.get("/:id", validateRoomId, getRoomByIdController)

// Protected routes
roomRouter.post("/", authenticate, validateRoomBody, createRoomController)
roomRouter.put("/:id", authenticate, validateRoomId, validateRoomBody, updateRoomController)
roomRouter.delete("/:id", authenticate, validateRoomId, deleteRoomController)

export default roomRouter