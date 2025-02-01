import React, { useState } from 'react';
import PropTypes from "prop-types";
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
    <div className={styLst.div3}>
      {/* Left Side - Inputs */}
      <div className={styLst.div4}>
        {inputTab === 'taskInput' && <TaskInput tasks={tasks} setTasks={setTasks} styLst={styLst} />}
        {inputTab === 'projectInfo' && <ProjectInfo projectInfo={projectInfo} setProjectInfo={setProjectInfo} styLst={styLst} />}
        {inputTab === 'distributionInfo' && <DistributionInfo styLst={styLst} />}
        {inputTab === 'monteCarloParams' && <MonteCarloParams monteCarloParams={monteCarloParams} setMonteCarloParams={setMonteCarloParams} styLst={styLst} />}
      </div>
      
      {/* Right Side - Outputs */}
      <div className={styLst.div4}>
        {outputTab === 'taskList' && <TaskList projectInfo={projectInfo} tasks={tasks} styLst={styLst} />}
        {outputTab === 'ganttChart' && <GanttChart projectInfo={projectInfo} tasks={tasks} styLst={styLst} />}
        {outputTab === 'criticalPath' && <CriticalPath projectInfo={projectInfo} tasks={tasks} styLst={styLst} />}
        {outputTab === 'dataAnalysis' && <DataAnalysis projectInfo={projectInfo} tasks={tasks} styLst={styLst} />}
        {outputTab === 'timelineView' && <TimelineView projectInfo={projectInfo} tasks={tasks} styLst={styLst} />}
      </div>
    </div>
  );
};

export default Tabs;

Tabs.propTypes = {
  inputTab: PropTypes.string.isRequired,
  outputTab: PropTypes.string.isRequired,
};