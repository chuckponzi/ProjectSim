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
  const [monteCarloParams, setMonteCarloParams] = useState({
    numSimulations: "10"
  });

  console.log("Tasks: ", tasks, "Project Info: ", projectInfo, "MC: ", monteCarloParams);

  return (
    <div id="app-container">
      <Header />
      <Tabs
        tasks={tasks}
        setTasks={setTasks}
        projectInfo={projectInfo}
        setProjectInfo={setProjectInfo}
        monteCarloParams={monteCarloParams}
        setMonteCarloParams={setMonteCarloParams}
      />
    </div>
  );
};

export default App;
