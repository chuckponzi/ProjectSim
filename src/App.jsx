import React, { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]); // Default to empy task list
  const [projectInfo, setProjectInfo] = useState({
    name: "My Project",
    startDate: new Date().toISOString().split("T")[0], // Default to today
    calendar: "default",
  });

  return (
    <div id="app-container">
      <Header />
      <Tabs
        tasks={tasks}
        setTasks={setTasks}
        projectInfo={projectInfo}
        setProjectInfo={setProjectInfo}
      />
    </div>
  );
};

export default App;
