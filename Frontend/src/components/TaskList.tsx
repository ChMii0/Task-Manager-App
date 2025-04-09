import { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../Styles/TaskList.css';

// Define the TaskItem type based on your API response
interface TaskItem {
  taskId: number;
  title: string;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks: TaskItem[];
  updateTaskStatus: (taskId: number, isCompleted: boolean) => void;
  deleteTask: (taskId: number) => void;
}

function TasksList({ tasks, updateTaskStatus, deleteTask }: TaskListProps) {

  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);
  return (
    <div>
    <h2 className="tasksSubheading">Uncompleted Tasks</h2>
    <List className="taskList">
      {tasks.map((task) => (
        <ListItem key={task.taskId} className="taskItem" 
        onMouseEnter={() => setHoveredTaskId(task.taskId)} 
        onMouseLeave={() => setHoveredTaskId(null)}
        sx={{ position: "relative" }}>
          <Checkbox
            checked={false}
            onChange={() => updateTaskStatus(task.taskId, true)} // ✅ Update global state
            sx={{
              color: "white",
              '&.Mui-checked': { color: "white" },
            }}
          />
          <ListItemText primary={task.title} />

          {hoveredTaskId === task.taskId && (
            <IconButton
              onClick={() => deleteTask(task.taskId)}
              sx={{
                position: "absolute",
                right: -40,
                color: "white",
              }}
              >
              <CloseIcon />
              </IconButton>
          )}
        </ListItem>
      ))}
    </List>
  </div>
);
}

export default TasksList;
