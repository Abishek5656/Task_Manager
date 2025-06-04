import React, { useMemo } from "react";
import { MdCheck } from "react-icons/md";

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

      <section className="bg-white shadow-md rounded-md p-4">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center py-2"
              >
                <div className="flex items-center">
                  {/* Checkbox area */}
                  <button
                    onClick={() => onToggle(task._id)}
                    aria-label={
                      task.isCompleted
                        ? "Mark as incomplete"
                        : "Mark as complete"
                    }
                    className={`flex items-center justify-center w-6 h-6 mr-3 border-2 rounded-md focus:outline-none ${
                      task.isCompleted
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-400 text-transparent"
                    }`}
                  >
                    {task.isCompleted && <MdCheck size={18} />}
                  </button>

                  {/* Task title */}
                  <span
                    className={`select-none ${
                      task.isCompleted
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => onDelete(task._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default TaskList;
