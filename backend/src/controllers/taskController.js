import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, textContent, userId } = req.body;

    if (!userId) return res.status(400).json({ message: "userId is required" });
    if (!title || !title.trim()) return res.status(400).json({ message: "Title is required" });

    const task = new Task({ title: title.trim(), textContent, userId });
    await task.save();
    res.status(201).json({ message: "Task created", data: task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// export const getTasks = async (req, res) => {
//   try {
//     const { userId, search, filter } = req.query;

//     if (!userId) return res.status(400).json({ message: "userId is required" });

//     // Initialize query with userId filter
//     let query = { userId };

//     if (search) {
//       query.title = { $regex: search, $options: "i" };
//     }

//     // Optionally handle filter for completed or pending
//     if (filter === "completed") {
//       query.isCompleted = true;
//     } else if (filter === "pending") {
//       query.isCompleted = false;
//     }

//     const tasks = await Task.find(query).sort({ createdAt: -1 });
//     res.status(200).json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };



export const getTasks = async (req, res) => {
  try {
    const { userId } = req.params;;

    if (!userId) return res.status(400).json({ message: "userId is required" });

    // Query tasks only for the given userId
    const tasks = await Task.find({ userId: userId }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, textContent } = req.body;

    // const task = await Task.findByIdAndUpdate(
    //   id,
    //   { title, textContent, isCompleted: true },
    //   { new: true, runValidators: true }
    // );

    // const task = await Task.findByIdAndUpdate(id, {
    //   $set: {
    //     isCompleted: true
    //   }
    // })

    const task = await Task.findByIdAndUpdate(
      id,
      { isCompleted: true },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task updated", data: task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const toggleTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found", data: "" });

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      message: `Task marked as ${task.isCompleted ? "completed" : "pending"}`,
      data: task,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found", data: "" });

    res.status(200).json({ message: "Task deleted", data: "" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
