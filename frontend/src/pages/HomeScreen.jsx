import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

const Home = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks?userId=${userId}&filter=${filter}`
      );
      setTasks(res.data);
    } catch {
      alert("Failed to fetch tasks");
    }
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
      <Navbar
        search={search}
        setSearch={setSearch}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        onLogout={handleLogout}
      />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
        <TaskInput title={title} setTitle={setTitle} onAdd={handleAdd} />
        <TaskList
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          onToggle={handleToggle}
          onDelete={handleDelete}
          search={search}
        />
      </div>
    </div>
  );
};

export default Home;
