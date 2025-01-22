import React, { useState } from 'react';

const TaskInput = ({ tasks, setTasks }) => {
  const [taskName, setTaskName] = useState('');
  const [taskLength, setTaskLength] = useState('1 day');
  const [taskPredecessor, setTaskPredecessor] = useState('');
  const [distributionType, setDistributionType] = useState('normal');

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      length: taskLength,
      predecessor: taskPredecessor,
      distribution: distributionType,
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskLength('1 day');
    setTaskPredecessor('');
    setDistributionType('normal');
  };

  const handleClearTasks = () => {
    setTasks([]);
  };

  return (
    <div>
      <h2>Task Input</h2>
      <label>Task Name:</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />
      <label>Task Length:</label>
      <input
        type="text"
        value={taskLength}
        onChange={(e) => setTaskLength(e.target.value)}
        placeholder="Task Length"
      />
      <label>Task Predecessor:</label>
      <input
        type="text"
        value={taskPredecessor}
        onChange={(e) => setTaskPredecessor(e.target.value)}
        placeholder="Task Predecessor"
      />
      <label>Distribution Type:</label>
      <select
        value={distributionType}
        onChange={(e) => setDistributionType(e.target.value)}
      >
        <option value="normal">Normal</option>
        <option value="uniform">Uniform</option>
        <option value="exponential">Exponential</option>
        <option value="triangular">Triangular</option>
        <option value="beta">Beta</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={handleClearTasks}>Clear All Tasks</button>
    </div>
  );
};

export default TaskInput;
