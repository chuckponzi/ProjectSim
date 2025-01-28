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
    <div 
      id="app-container" 
      className="min-h-screen bg-background text-text flex flex-col items-center p-4"
    >
      <Header className="w-full bg-primary text-white text-center p-4 shadow-md" />
      <Tabs
        tasks={tasks}
        setTasks={setTasks}
        projectInfo={projectInfo}
        setProjectInfo={setProjectInfo}
        monteCarloParams={monteCarloParams}
        setMonteCarloParams={setMonteCarloParams}
        className="w-full flex justify-center gap-4 border-b-2 border-border pb-2"
      />
    </div>
  );
};

export default App;
