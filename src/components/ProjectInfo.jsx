import React, { useState } from 'react';

const ProjectInfo = ({ projectInfo, setProjectInfo }) => {
  const handleNameChange = (e) => {
    setProjectInfo((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleStartDateChange = (e) => {
    setProjectInfo((prev) => ({
      ...prev,
      startDate: e.target.value,
    }));
  };

  const handleCalendarChange = (e) => {
    setProjectInfo((prev) => ({
      ...prev,
      calendar: e.target.value,
    }));
  };

  return (
    <div>
      <h2>Project Info</h2>
      <div>
        <label>Project Name:</label>
        <input
          type="text"
          value={projectInfo.name}
          onChange={handleNameChange}
          placeholder="Project Name"
        />
      </div>
      <div>
        <label>Project Start Date:</label>
        <input
          type="date"
          value={projectInfo.startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div>
        <p>Select a calendar:</p>
        <label>
          <input
            type="radio"
            name="calendar"
            value="default"
            checked={projectInfo.calendar === 'default'}
            onChange={handleCalendarChange}
          />
          Default (5 days/week, 10 hours/day)
        </label>
        <label>
          <input
            type="radio"
            name="calendar"
            value="yearRound"
            checked={projectInfo.calendar === 'yearRound'}
            onChange={handleCalendarChange}
          />
          Year Round (7 days/week, 24 hours/day)
        </label>
      </div>
    </div>
  );
};

export default ProjectInfo;
