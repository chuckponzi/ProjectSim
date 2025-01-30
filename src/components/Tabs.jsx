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

const Tabs = ({ inputTab, outputTab, tasks, setTasks, projectInfo, setProjectInfo, monteCarloParams, setMonteCarloParams, styLst }) => {

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left Side - Inputs */}
      <div className="bg-card p-4 rounded-lg shadow-md">
        {inputTab === 'taskInput' && <TaskInput tasks={tasks} setTasks={setTasks} styLst={styLst} />}
        {inputTab === 'projectInfo' && <ProjectInfo projectInfo={projectInfo} setProjectInfo={setProjectInfo} styLst={styLst} />}
        {inputTab === 'distributionInfo' && <DistributionInfo styLst={styLst} />}
        {inputTab === 'monteCarloParams' && <MonteCarloParams monteCarloParams={monteCarloParams} setMonteCarloParams={setMonteCarloParams} styLst={styLst} />}
      </div>
      
      {/* Right Side - Outputs */}
      <div className="bg-card p-4 rounded-lg shadow-md">
        {outputTab === 'taskList' && <TaskList tasks={tasks} styLst={styLst} />}
        {outputTab === 'ganttChart' && <GanttChart tasks={tasks} styLst={styLst} />}
        {outputTab === 'criticalPath' && <CriticalPath tasks={tasks} styLst={styLst} />}
        {outputTab === 'dataAnalysis' && <DataAnalysis tasks={tasks} styLst={styLst} />}
        {outputTab === 'timelineView' && <TimelineView tasks={tasks} styLst={styLst} />}
      </div>
    </div>
  );
};

export default Tabs;
