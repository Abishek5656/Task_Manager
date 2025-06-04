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
    if (!userId) return; // safety check
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/task/${userId}`);
      setTasks(res.data);
    } catch (error) {
      alert("Failed to fetch tasks");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      await axios.post("http://localhost:8000/api/v1/task/add", { title, userId });
      setTitle("");
      await fetchTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
      alert("Failed to add task");
    }
  };

  const handleToggle = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/task/toggle-complete/${id}`);
      await fetchTasks();
    } catch (error) {
      console.error("Failed to toggle task:", error);
      alert("Failed to toggle task completion");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/task/delete/${id}`);
      await fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task");
    }
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
