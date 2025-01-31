// File: src/components/TaskList.jsx

import React from "react";
import PropTypes from "prop-types";

const TaskList = ({ projectInfo, tasks, styLst }) => {
  
  return (
    <div className={styLst.form}>
      <h2 className={styLst.title}>Task List</h2>
      <div className="bg-card p-4 rounded-lg shadow-md border border-border mb-4">
        <h3 className="text-lg font-semibold text-text">Project Info</h3>
        <p className="text-sm text-muted">Name: {projectInfo.name}</p>
        <p className="text-sm text-muted">Start Date: {projectInfo.startDate}</p>
        <p className="text-sm text-muted">Calendar: {projectInfo.calendar}</p>
      </div>
      {tasks.length === 0 ? (
        <p className="text-muted text-center">No tasks available. Add some tasks to get started!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="bg-card p-4 rounded-lg shadow-md border border-border">
              <p className="text-lg font-semibold text-text">{task.name}</p>
              <p className="text-sm text-muted">Length: {task.duration}, Predecessor: {task.predecessor}</p>
              <p className="text-sm text-muted">Distribution: {task.distributionType}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

TaskList.propTypes = {
  projectInfo: PropTypes.isRequired,
  tasks: PropTypes.array.isRequired,
  styLst: PropTypes.object.isRequired,
};

export default TaskList;
