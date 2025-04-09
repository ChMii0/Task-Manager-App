import { useTasks } from './hooks/useTasks'; 
import TasksList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks'; 
import TaskForm from './components/TaskForm';
import './Styles/styles.css';

function App() {
  const { tasks, updateTaskStatus, createTask, deleteTask, error } = useTasks();

  if (error) {
    return <div className="app">Failed to fetch tasks: {error}</div>;
  }

  return (
    <div className="app">
      <h1 className="title">Task Manager</h1>
      <div className="container">
        <TasksList 
        tasks={tasks.filter((task) => !task.isCompleted)}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}/>
      </div>
      <div className="container">
        <CompletedTasks
          tasks={tasks.filter((task) => task.isCompleted)}
          updateTaskStatus={updateTaskStatus} 
          deleteTask={deleteTask}/>
      </div>
      <TaskForm createTask={createTask} />
    </div>
  );
}

export default App;
