import {
  addTask,
  deleteTask,
  fetchTasks,
  editTask,
  fetchTask,
  editTaskStatus,
} from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();

router.get("/tasks", authMiddleware, fetchTasks);
router.post("/tasks/addTask", authMiddleware, addTask);
router.put("/task/status", editTaskStatus);
router.delete("/tasks/:taskId", deleteTask);
router.put("/tasks/editTask", editTask);
router.get("/tasks/:taskId", fetchTask);

export default router;
