import TasksList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';
import { useTasks } from './hooks/useTasks';  
import './Styles/styles.css';

function App() {
  const { tasks, updateTaskStatus, error } = useTasks();

  if (error) {
    return <div className="app">Failed to fetch tasks: {error}</div>;
  }

  return (
    <div className="app">
      <h1 className="title">Task Manager</h1>
      <div className="container">
        <TasksList 
        tasks={tasks.filter((task) => !task.isCompleted)}
        updateTaskStatus={updateTaskStatus}/>
        <CompletedTasks
        tasks={tasks.filter((task) => task.isCompleted)}
        updateTaskStatus={updateTaskStatus} 
        />
      </div>
    </div>
  );
}

export default App;
