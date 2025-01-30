// File: src/components/Header.jsx

import React from "react";
import PropTypes from "prop-types";

const Header = ({ inputTab, setInputTab, outputTab, setOutputTab, styLst }) => {
  const inputTabs = [
    { id: "projectInfo", label: "Project Info" },
    { id: "taskInput", label: "Task Input" },
    { id: "distributionInfo", label: "Distribution Info" },
    { id: "monteCarloParams", label: "Monte Carlo" },
  ];

  const outputTabs = [
    { id: "taskList", label: "Task List" },
    { id: "criticalPath", label: "Critical Path" },
    { id: "dataAnalysis", label: "Data Analysis" },
    { id: "ganttChart", label: "Gantt Chart" },
    { id: "timelineView", label: "Timeline View" },
  ];

  return (
    <header className="w-full bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between px-4">
        {/* Input Tabs on Left */}
        <nav className="flex space-x-4">
          {inputTabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-md transition ${
                inputTab === tab.id ? "bg-secondary text-white" : "bg-transparent hover:bg-secondary/50"
              }`}
              onClick={() => setInputTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Output Tabs on Right */}
        <nav className="flex space-x-4">
          {outputTabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-md transition ${
                outputTab === tab.id ? "bg-secondary text-white" : "bg-transparent hover:bg-secondary/50"
              }`}
              onClick={() => setOutputTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  inputTab: PropTypes.string.isRequired,
  setInputTab: PropTypes.func.isRequired,
  outputTab: PropTypes.string.isRequired,
  setOutputTab: PropTypes.func.isRequired,
  styLst: PropTypes.object.isRequired,
};

export default Header;
