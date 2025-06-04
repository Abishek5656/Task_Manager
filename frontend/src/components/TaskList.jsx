import React, { useMemo } from "react";

const TaskList = ({ tasks, filter, setFilter, onToggle, onDelete, search }) => {
  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filter === "completed") filtered = tasks.filter((t) => t.isCompleted);
    if (filter === "pending") filtered = tasks.filter((t) => !t.isCompleted);
    if (search)
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    return filtered;
  }, [filter, tasks, search]);

  return (
    <>
      <div className="flex gap-2 mb-4">
        {["all", "completed", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center py-2 border-b"
          >
            <span
              onClick={() => onToggle(task._id)}
              className={`cursor-pointer ${
                task.isCompleted ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </span>
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
