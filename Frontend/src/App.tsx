import TasksList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';
import './Styles/styles.css';

function App() {
  return (
    <div className="app">
      <h1 className="title">Task Manager</h1>
      <div className="container">
        <TasksList />
        <CompletedTasks />
      </div>
    </div>
  );
}

export default App;
