// src/components/TaskInput.jsx
import React, { useState } from "react";

const TaskInput = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Add new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
};

export default TaskInput;
