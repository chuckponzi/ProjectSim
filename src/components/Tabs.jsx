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

const Tabs = ({ tasks, setTasks, projectInfo, setProjectInfo }) => {

  const [activeTab, setActiveTab] = useState('taskInput');

  const tabs = [
    { id: 'taskInput', label: 'Task Input', component: <TaskInput tasks={tasks} setTasks={setTasks} /> },
    { id: 'projectInfo', label: 'Project Info', component: <ProjectInfo projectInfo={projectInfo} setProjectInfo={setProjectInfo} /> },
    { id: 'distributionInfo', label: 'Distribution Info', component: <DistributionInfo /> },
    { id: 'monteCarloParams', label: 'Monte Carlo Params', component: <MonteCarloParams /> },
    { id: 'taskList', label: 'Task List', component: <TaskList tasks={tasks} projectInfo={projectInfo} /> },
    { id: 'ganttChart', label: 'Gantt Chart', component: <GanttChart tasks={tasks} projectInfo={projectInfo}/> },
    { id: 'criticalPath', label: 'Critical Path', component: <CriticalPath tasks={tasks} projectInfo={projectInfo} /> },
    { id: 'dataAnalysis', label: 'Data Analysis', component: <DataAnalysis tasks={tasks} projectInfo={projectInfo} /> },
    { id: 'timelineView', label: 'Timeline View', component: <TimelineView tasks={tasks} projectInfo={projectInfo} /> },
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
