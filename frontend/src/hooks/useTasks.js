import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Backend_Url } from "../constant";

export const useTasks = () => {
  const userId = localStorage.getItem("userId");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${Backend_Url}/task/${userId}`);
      setTasks(res.data);
    } catch (error) {
      // console.error("Failed to fetch tasks:", error);
      // toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title) => {
    if (!title.trim() || !userId) return;
    try {
      await axios.post(`${Backend_Url}/task/add`, { title, userId });
      await fetchTasks();
      toast.success("Task added");
    } catch (error) {
      console.error("Failed to add task:", error);
      toast.error("Failed to add task");
    }
  };

  const toggleTask = async (id) => {
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );

    try {
      await axios.patch(`${Backend_Url}/task/toggle-complete/${id}`);
      // Optionally you can refetch to sync exactly with backend
      // await fetchTasks();
    } catch (error) {
      toast.error("Failed to toggle task completion");
      // Revert to backend state on error:
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${Backend_Url}/task/delete/${id}`);
      await fetchTasks();
      toast.success("Task deleted");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
    }
  };

  return {
    tasks,
    loading,
    fetchTasks,
    addTask,
    toggleTask,
    deleteTask,
  };
};
