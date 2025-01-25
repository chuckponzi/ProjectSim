// File: src/components/ProjectInfo.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";

const ProjectInfo = ({ projectInfo, setProjectInfo }) => {
  
  const handleInputChange = (e) => {
    const { id, value } = e.target; // Destructure id and value from the input element
    setProjectInfo((prev) => ({
      ...prev,
      [id]: value, // Use id to dynamically update the corresponding property in the state
    }));
  };

  return (
    <div className="project-info">
      <h2>Project Info</h2>

      <label htmlFor="projectName">Project Name:</label>
      <input
        type="text"
        id="name" // Changed "name" attribute to "id" for clarity
        value={projectInfo.name}
        onChange={handleInputChange}
        placeholder="Enter project name"
      />

      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate" // Changed "name" to "id" for better clarity and consistency
        value={projectInfo.startDate}
        onChange={handleInputChange}
      />

      <label>Calendar Options:</label>
      <div>
        <label>
          <input
            type="radio"
            id="calendar" // Changed "name" to "id" to match state key
            value="default"
            checked={projectInfo.calendar === "default"}
            onChange={handleInputChange}
          />
          Default: 5 days/week, 10 hours/day
        </label>
        <label>
          <input
            type="radio"
            id="calendar" // Changed "name" to "id" for consistency
            value="yearRound"
            checked={projectInfo.calendar === "yearRound"}
            onChange={handleInputChange}
          />
          Year Round: 7 days/week, 24 hours/day
        </label>
      </div>
    </div>
  );
};

ProjectInfo.propTypes = {
  projectInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    calendar: PropTypes.string.isRequired,
  }).isRequired,
  setProjectInfo: PropTypes.func.isRequired,
};

export default ProjectInfo;
