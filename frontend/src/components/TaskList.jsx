import React from "react";

const TaskList = ({ tasks, filter, setFilter, search, onToggle, onDelete }) => {
  const filteredTasks = (tasks || []).filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.isCompleted) ||
      (filter === "pending" && !task.isCompleted);
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Filters */}
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

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map(({ _id, title, isCompleted }) => (
            <li
              key={_id}
              className="flex justify-between items-center p-2 border rounded bg-white shadow"
            >
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!!isCompleted} // Ensure boolean
                  onChange={() => onToggle(_id)}
                  className="cursor-pointer"
                />
                <span className={isCompleted ? "line-through text-gray-500" : ""}>
                  {title}
                </span>
              </label>
              <button
                onClick={() => onDelete(_id)}
                className="text-red-600 hover:text-red-800"
                aria-label={`Delete task ${title}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
