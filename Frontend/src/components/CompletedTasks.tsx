import { Checkbox, List, ListItem, ListItemText } from '@mui/material';


interface TaskItem {
    taskId: number;
    title: string;
    isCompleted: boolean;
  }

  interface CompletedTasksProps {
    tasks: TaskItem[];
    updateTaskStatus: (taskId: number, isCompleted: boolean) => void;
  }

function CompletedTasks({ tasks, updateTaskStatus }: CompletedTasksProps) {
    return (
      <div>
      <h2 className="tasksSubheading">Completed Tasks</h2>
      <List className="completedTasksList">
        {tasks.map((task) => (
          <ListItem key={task.taskId} className="taskItem">
            <Checkbox
              checked={true}
              onChange={() => updateTaskStatus(task.taskId, false)} // ✅ Move task back to uncompleted
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

  
  //   useEffect(() => {
  //     fetch('http://localhost:5229/api/Task')
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // filter out uncompleted tasks
  //         const filteredTasks = data.filter((tasks: TaskItem) => tasks.isCompleted);
  //         setTasks(filteredTasks);
  //       })
  //       .catch((error) => setError(error.message));
  //   }, []);

  //   const handleCheckboxChange = async (taskId: number) => {
  //     try {
  //       const response = await fetch(`http://localhost:5229/api/task/${taskId}`, {
  //         method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ isCompleted: false }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update task");
  //     }

  //     setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // };
  
  //   if (error) return <div>Error: {error}</div>;
  
  //   return (
  //     <div>
  //       <h2 className="tasksSubheading">Completed Tasks</h2>
  //       <List className="completedTasksList">
  //         {tasks.map((task) => (
  //           <ListItem key={task.taskId} className="taskItem">
  //             <Checkbox
  //             checked={task.isCompleted}
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
  
  export default CompletedTasks;