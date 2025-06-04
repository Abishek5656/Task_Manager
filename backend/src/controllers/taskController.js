// controllers/taskController.js
import Task from "../models/task.model.js";
export const createTask = async (req, res) => {
  try {
    const { title, textContent, userId } = req.body;
    const task = new Task({ title, textContent, userId });
    await task.save();
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get tasks (All, Completed, Pending)
export const getTasks = async (req, res) => {
  try {
    const { userId, filter } = req.query;

    const conditions = { userId };
    if (filter === "completed") conditions.isCompleted = true;
    if (filter === "pending") conditions.isCompleted = false;

    const tasks = await Task.find(conditions).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Update task (title or content)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, textContent } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { title, textContent },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Mark as completed/incomplete
export const toggleTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      message: `Task marked as ${task.isCompleted ? "completed" : "pending"}`,
      task,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
