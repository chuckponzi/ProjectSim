import React, { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]); // Manage tasks state

  // Function to add tasks
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    console.log('Task added:', task);
  };

  return (
    <div id="app-container">
      <Header />
      <Tabs addTask={addTask} />
    </div>
  );
}

export default App;
