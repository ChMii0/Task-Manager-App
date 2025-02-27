import { useEffect, useState } from 'react';

// Define the TaskItem type based on your API response
interface TaskItem {
  taskId: number;
  title: string;
  isCompleted: boolean;
}

function TasksList() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5229/api/Task')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskId}>
            {task.title} - {task.isCompleted ? '✅ Completed' : '❌ Not Completed'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksList;
