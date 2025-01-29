import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import StyLst from "./styles/StyLst";
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

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  console.log("Tasks: ", tasks, "Project Info: ", projectInfo, "MC: ", monteCarloParams);

  return (
    <div className={StyLst.app} >
      <Header className={StyLst.Header} styLst={StyLst} />
      <Tabs
        tasks={tasks}
        setTasks={setTasks}
        projectInfo={projectInfo}
        setProjectInfo={setProjectInfo}
        monteCarloParams={monteCarloParams}
        setMonteCarloParams={setMonteCarloParams}
        styLst={StyLst}
        className={StyLst.Tabs}
      />
    </div>
  );
};

export default App;
