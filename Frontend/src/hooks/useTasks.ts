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

  return { tasks, updateTaskStatus, error };
}