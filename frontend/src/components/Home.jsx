import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

const API_BASE_URL = "http://localhost:8000/api/v1/task";


const Home = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  // const fetchTasks = async () => {
  //   try {
  //     const params = new URLSearchParams({
  //       userId,
  //       filter,
  //       search,
  //     });
  //     const res = await axios.get(`${API_BASE_URL}?${params.toString()}`);
  //     setTasks(res.data);
  //   } catch (error) {
  //     alert("Failed to fetch tasks");
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTasks();
  // }, [filter]);



  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(`${API_BASE_URL}/add`, { title: title.trim(), userId });
      setTitle("");
      // fetchTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/toggle-complete/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
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
