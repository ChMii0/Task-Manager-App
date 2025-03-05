import TasksList from './components/TaskList';
import './Styles/styles.css';

function App() {
  return (
    <div className="app">
      <h1 className="title">Task Manager</h1>
      <div className="container">
        <TasksList />
      </div>
    </div>
  );
}

export default App;
