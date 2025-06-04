import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filter === "completed") filtered = tasks.filter((t) => t.isCompleted);
    if (filter === "pending") filtered = tasks.filter((t) => !t.isCompleted);
    if (search) filtered = filtered.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
    return filtered;
  }, [filter, tasks, search]);

  const fetchTasks = async () => {
    const res = await axios.get(`http://localhost:5000/api/tasks?userId=${userId}&filter=${filter}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleAdd = async () => {
    if (!title.trim()) return;
    await axios.post("http://localhost:5000/api/tasks/add", { title, userId });
    setTitle("");
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await axios.patch(`http://localhost:5000/api/tasks/toggle-complete/${id}`);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/delete/${id}`);
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-1/3"
        />
        <div className="relative">
          <div
            className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            U
          </div>
          {showLogout && (
            <div
              className="absolute right-0 mt-2 bg-white border rounded shadow px-4 py-2 text-sm cursor-pointer"
              onClick={handleLogout}
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              Logout
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Add new task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
        <div className="flex gap-2 mb-4">
          {['all', 'completed', 'pending'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
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
                onClick={() => handleToggle(task._id)}
                className={`cursor-pointer ${task.isCompleted ? 'line-through text-gray-500' : ''}`}
              >
                {task.title}
              </span>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;