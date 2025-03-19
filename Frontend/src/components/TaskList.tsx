import { useEffect, useState } from 'react';
import { Checkbox, List, ListItem, ListItemText } from '@mui/material';

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
      .then((data) => {
        const filteredTasks = data.filter((tasks: TaskItem) => !tasks.isCompleted);
        setTasks(filteredTasks);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="tasksSubheading">Uncomplete Tasks</h2>
      <List className="taskList">
        {tasks.map((task) => (
          <ListItem key={task.taskId} className="taskItem">
            <Checkbox
              sx={{
                color: "white",
                '&.Mui-checked': {
                  color: "white",
                },
              }}
            />
            <ListItemText primary={task.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TasksList;
