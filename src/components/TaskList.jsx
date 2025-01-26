import React from 'react';

const TaskList = ({ tasks }) => {

  if (tasks.length === 0) {
    return <p>No tasks available. Add some tasks to get started!</p>;
  }

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <strong>{task.name}</strong> - Length: {task.length}, Predecessor: {task.predecessor}, Distribution: {task.distribution}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
