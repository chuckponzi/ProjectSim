// File: src/components/TaskList.jsx

import React from "react";
import PropTypes from "prop-types";

const TaskList = ({ tasks, styLst }) => {
  if (tasks.length === 0) {
    return <p className="text-muted text-center">No tasks available. Add some tasks to get started!</p>;
  }

  return (
    <div className={styLst.form}>
      <h2 className={styLst.title}>Task List</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-card p-4 rounded-lg shadow-md border border-border">
            <p className="text-lg font-semibold text-text">{task.name}</p>
            <p className="text-sm text-muted">Length: {task.duration}, Predecessor: {task.predecessor}</p>
            <p className="text-sm text-muted">Distribution: {task.distributionType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  styLst: PropTypes.object.isRequired,
};

export default TaskList;
