// src/screens/HomeScreen.jsx
import React, { useState } from "react";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";

import Navbar from "../components/Navbar.jsx";
import { useNavbar } from "../hooks/useCustom.js";

const HomeScreen = () => {
  const [filter, setFilter] = useState("all");
  const { search, setSearch, showLogout, setShowLogout, onLogout } = useNavbar();
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks();

  return (
    <div className="max-w-xl mx-auto p-4">
      <Navbar
        search={search}
        setSearch={setSearch}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        onLogout={onLogout}
      />

      <h1 className="text-3xl font-bold mb-4 text-center">Task Manager</h1>

      <TaskInput onAdd={addTask} />

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          search={search}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
};

export default HomeScreen;
