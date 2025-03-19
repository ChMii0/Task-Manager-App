import { useEffect, useState } from 'react';
import { Checkbox, List, ListItem, ListItemText } from '@mui/material';


interface TaskItem {
    taskId: number;
    title: string;
    isCompleted: boolean;
  }

function CompletedTasks() {
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
          const filteredTasks = data.filter((tasks: TaskItem) => tasks.isCompleted);
          setTasks(filteredTasks);
        })
        .catch((error) => setError(error.message));
    }, []);
  
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div>
        <h2 className="tasksSubheading">Completed Tasks</h2>
        <List className="completedTasksList">
          {tasks.map((task) => (
            <ListItem key={task.taskId} className="taskItem">
              <Checkbox
              checked={task.isCompleted}
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
  
  export default CompletedTasks;