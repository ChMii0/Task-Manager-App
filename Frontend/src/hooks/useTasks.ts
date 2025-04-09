import { useState, useEffect } from 'react';

// Task type definition
interface TaskItem {
  taskId: number;
  title: string;
  isCompleted: boolean;
}

// Custom hook to manage tasks
export function useTasks() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on mount
  useEffect(() => {
    fetch('http://localhost:5229/api/Task')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(setTasks)
      .catch((error) => setError(error.message));
  }, []);

  // Function to update a task's completion status
  const updateTaskStatus = async (taskId: number, isCompleted: boolean) => {
    try {
      const response = await fetch(`http://localhost:5229/api/Task/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      // ✅ Update state instantly without fetching again
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.taskId === taskId ? { ...task, isCompleted } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // function to create new task
  const createTask = async (title: string, description: string) => {
    try {
      const response = await fetch("http://localhost:5229/api/Task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, taskDesc: description, isCompleted: false }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // function to delete task
  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:5229/api/Task/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return { tasks, updateTaskStatus, createTask, deleteTask, error };
}