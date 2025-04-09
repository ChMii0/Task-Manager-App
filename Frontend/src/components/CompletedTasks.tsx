import { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface TaskItem {
    taskId: number;
    title: string;
    isCompleted: boolean;
  }

  interface CompletedTasksProps {
    tasks: TaskItem[];
    updateTaskStatus: (taskId: number, isCompleted: boolean) => void;
    deleteTask: (taskId: number) => void;
  }

function CompletedTasks({ tasks, updateTaskStatus, deleteTask}: CompletedTasksProps) {
    
    const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);

    return (
      <div>
      <h2 className="tasksSubheading">Completed Tasks</h2>
      <List className="completedTasksList">
        {tasks.map((task) => (
          <ListItem key={task.taskId} className="taskItem" 
          onMouseEnter={() => setHoveredTaskId(task.taskId)}
          onMouseLeave={() => setHoveredTaskId(null)}
          sx={{ position: "relative" }}>
            <Checkbox
              checked={true}
              onChange={() => updateTaskStatus(task.taskId, false)} // ✅ Move task back to uncompleted
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

export default CompletedTasks;