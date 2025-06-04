import React from "react";

const TaskInput = ({ title, setTitle, onAdd }) => {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Add new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={onAdd}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add
      </button>
    </div>
  );
};

export default TaskInput;
