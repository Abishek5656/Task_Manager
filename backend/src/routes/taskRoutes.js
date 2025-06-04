// routes/taskRoutes.js
import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/add", createTask);                   // Create task
router.get("/", getTasks);                         // Read tasks (filter via query)
router.put("/update/:id", updateTask);             // Update title/content
router.patch("/toggle-complete/:id", toggleTaskCompletion); // Mark complete/incomplete
router.delete("/delete/:id", deleteTask);          // Delete task

export default router;
