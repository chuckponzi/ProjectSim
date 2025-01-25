import React, { useState } from 'react';
import TaskInput from './TaskInput';
import ProjectInfo from './ProjectInfo';
import DistributionInfo from './DistributionInfo';
import MonteCarloParams from './MonteCarloParams';
import TaskList from './TaskList';
import GanttChart from './GanttChart';
import CriticalPath from './CriticalPath';
import DataAnalysis from './DataAnalysis';
import TimelineView from './TimelineView';

const Tabs = ({ addTask }) => {

  const [activeTab, setActiveTab] = useState('taskInput');
  const [tasks, setTasks] = useState([]); // Shared state for tasks
  const [projectInfo, setProjectInfo] = useState({
    name: 'My Project',
    startDate: new Date().toISOString().split('T')[0], // Default to today
    calendar: 'default',
  });
  const [monteCarloParams, setMonteCarloParams] = useState({
    numSimulations: 1000, // Default number of simulations
    confidenceInterval: 95, // Default confidence interval
    outputSettings: 'average', // Default output setting
  });

  const tabs = [
    { id: 'taskInput', label: 'Task Input', component: <TaskInput tasks={tasks} addTask={addTask}/> },
    { id: 'projectInfo', label: 'Project Info', component: <ProjectInfo projectInfo={projectInfo} setProjectInfo={setProjectInfo} /> },
    { id: 'distributionInfo', label: 'Distribution Info', component: <DistributionInfo /> },
    {
      id: 'monteCarloParams',
      label: 'Monte Carlo Params',
      component: <MonteCarloParams monteCarloParams={monteCarloParams} setMonteCarloParams={setMonteCarloParams} />,
    },
    { id: 'taskList', label: 'Task List', component: <TaskList tasks={tasks} /> },
    { id: 'ganttChart', label: 'Gantt Chart', component: <GanttChart tasks={tasks} /> },
    { id: 'criticalPath', label: 'Critical Path', component: <CriticalPath /> },
    { id: 'dataAnalysis', label: 'Data Analysis', component: <DataAnalysis /> },
    { id: 'timelineView', label: 'Timeline View', component: <TimelineView /> },
  ];

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.find((tab) => tab.id === activeTab)?.component || <TaskInput tasks={tasks} setTasks={setTasks} />}
      </div>
    </div>
  );
};

export default Tabs;
