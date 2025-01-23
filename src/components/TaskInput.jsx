// File: src/components/TaskInput.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";

const TaskInput = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskLength, setTaskLength] = useState("1 day");
  const [taskPredecessor, setTaskPredecessor] = useState("");
  const [distributionType, setDistributionType] = useState("normal");
  const [mean, setMean] = useState("");
  const [standardDeviation, setStandardDeviation] = useState("");
  const [warning, setWarning] = useState("");

  const parseDuration = (input) => {
    const regex = /^(\d+(\.\d+)?)(\s?(d|h|w|m|y|day|days|hour|hours|week|weeks|month|months|year|years|mo|dy))?$/i;
    const match = input.match(regex);
    if (!match) {
      setWarning("Invalid duration format.");
      return NaN;
    }
    setWarning("");
    const value = parseFloat(match[1]);
    const unit = (match[4] || "d").toLowerCase();
    switch (unit) {
      case "h":
      case "hour":
      case "hours":
        return value / 24;
      case "w":
      case "week":
      case "weeks":
        return value * 7;
      case "m":
      case "month":
      case "months":
      case "mo":
        return value * 30;
      case "y":
      case "year":
      case "years":
        return value * 365;
      case "d":
      case "day":
      case "days":
      case "dy":
      default:
        return value;
    }
  };

  const handleAddTask = () => {
    const length = parseDuration(taskLength);
    if (!taskName || isNaN(length)) {
      alert("Please provide valid task information.");
      return;
    }

    const task = {
      id: Date.now(),
      name: taskName,
      length,
      predecessor: taskPredecessor,
      distributionType,
      mean: mean ? parseFloat(mean) : null,
      standardDeviation: standardDeviation ? parseFloat(standardDeviation) : null,
    };

    addTask(task); // Call the parent function to add a task
    resetForm();
  };

  const resetForm = () => {
    setTaskName("");
    setTaskLength("1 day");
    setTaskPredecessor("");
    setDistributionType("normal");
    setMean("");
    setStandardDeviation("");
    setWarning("");
  };

  return (
    <div className="task-input">
      <h2>Task Input</h2>
      {warning && <span className="warning">{warning}</span>}
      <label htmlFor="taskName">Task Name:</label>
      <input
        type="text"
        id="taskName"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />

      <label htmlFor="taskLength">Task Length:</label>
      <input
        type="text"
        id="taskLength"
        value={taskLength}
        onChange={(e) => setTaskLength(e.target.value)}
        placeholder="Task Length (e.g., 1 day)"
      />

      <label htmlFor="taskPredecessor">Task Predecessor:</label>
      <input
        type="text"
        id="taskPredecessor"
        value={taskPredecessor}
        onChange={(e) => setTaskPredecessor(e.target.value)}
        placeholder="Task Predecessor (Task ID)"
      />

      <label htmlFor="distributionType">Distribution Type:</label>
      <select
        id="distributionType"
        value={distributionType}
        onChange={(e) => setDistributionType(e.target.value)}
      >
        <option value="normal">Normal</option>
        <option value="uniform">Uniform</option>
        <option value="exponential">Exponential</option>
        <option value="triangular">Triangular</option>
        <option value="beta">Beta</option>
      </select>

      <label htmlFor="mean">Mean:</label>
      <input
        type="number"
        id="mean"
        value={mean}
        onChange={(e) => setMean(e.target.value)}
        placeholder="Mean"
      />

      <label htmlFor="standardDeviation">Standard Deviation:</label>
      <input
        type="number"
        id="standardDeviation"
        value={standardDeviation}
        onChange={(e) => setStandardDeviation(e.target.value)}
        placeholder="Standard Deviation"
      />

      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={resetForm}>Clear</button>
    </div>
  );
};

TaskInput.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskInput;
