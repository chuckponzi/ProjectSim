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

const Tabs = ({ tasks, setTasks, projectInfo, setProjectInfo, monteCarloParams, setMonteCarloParams, styLst }) => {

  const [activeTab, setActiveTab] = useState('taskInput');

  const tabs = [
    { 
      id: 'taskInput', 
      label: 'Task Input', 
      component: <TaskInput tasks={tasks} setTasks={setTasks} styLst={styLst} /> 
    },
    { 
      id: 'projectInfo', 
      label: 'Project Info', 
      component: <ProjectInfo projectInfo={projectInfo} setProjectInfo={setProjectInfo} styLst={styLst} /> 
    },
    { id: 'distributionInfo', label: 'Distribution Info', component: <DistributionInfo /> },
    { 
      id: 'monteCarloParams', 
      label: 'Monte Carlo Params', 
      component: <MonteCarloParams 
                  monteCarloParams={monteCarloParams} 
                  setMonteCarloParams={setMonteCarloParams} 
                /> 
    },
    { id: 'taskList', label: 'Task List', component: <TaskList tasks={tasks} projectInfo={projectInfo} /> },
    { id: 'ganttChart', label: 'Gantt Chart', component: <GanttChart tasks={tasks} projectInfo={projectInfo}/> },
    { id: 'criticalPath', label: 'Critical Path', component: <CriticalPath tasks={tasks} projectInfo={projectInfo} /> },
    { id: 'dataAnalysis', label: 'Data Analysis', component: <DataAnalysis tasks={tasks} projectInfo={projectInfo} /> },
    { id: 'timelineView', label: 'Timeline View', component: <TimelineView tasks={tasks} projectInfo={projectInfo} /> },
  ];

  return (
    <div>
      <div className="tabs w-full flex justify-center gap-4 border-b-2 border-gray-300 pb-2 mt-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 font-medium text-gray-600 hover:text-primary transition-colors duration-200 bg-blue-400 hover:bg-blue-500 rounded-lg shadow-md ${
              activeTab === tab.id ? 'border-b-2 border-primary text-primary' : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content p-4 bg-white rounded shadow">
        {tabs.find((tab) => tab.id === activeTab)?.component || <TaskInput tasks={tasks} setTasks={setTasks} />}
      </div>
    </div>
  );
};

export default Tabs;
