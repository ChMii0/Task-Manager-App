import { Checkbox, List, ListItem, ListItemText } from '@mui/material';
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
}

function TasksList({ tasks, updateTaskStatus }: TaskListProps) {
  return (
    <div>
    <h2 className="tasksSubheading">Uncompleted Tasks</h2>
    <List className="taskList">
      {tasks.map((task) => (
        <ListItem key={task.taskId} className="taskItem">
          <Checkbox
            checked={false}
            onChange={() => updateTaskStatus(task.taskId, true)} // ✅ Update global state
            sx={{
              color: "white",
              '&.Mui-checked': { color: "white" },
            }}
          />
          <ListItemText primary={task.title} />
        </ListItem>
      ))}
    </List>
  </div>
);
}


//   // fetch uncompleted tasks from the API
//   useEffect(() => {
//     fetch('http://localhost:5229/api/Task')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // filter out completed tasks
//         const filteredTasks = data.filter((tasks: TaskItem) => !tasks.isCompleted);
//         setTasks(filteredTasks);
//       })
//       .catch((error) => setError(error.message));
//   }, []);

//   const handleCheckboxChange = async (taskId: number) => {
//     try {
//       const response = await fetch(`http://localhost:5229/api/task/${taskId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isCompleted: true }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update task");
//     }

//     // remove the task from the list
//     setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
//   } catch (error) {
//     console.error("Error updating task:", error);
//   }
// };

//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2 className="tasksSubheading">Uncomplete Tasks</h2>
//       <List className="taskList">
//         {tasks.map((task) => (
//           <ListItem key={task.taskId} className="taskItem">
//             <Checkbox
//             onChange={() => handleCheckboxChange(task.taskId)}
//               sx={{
//                 color: "white",
//                 '&.Mui-checked': {
//                   color: "white",
//                 },
//               }}
//             />
//             <ListItemText primary={task.title} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// }


export default TasksList;
