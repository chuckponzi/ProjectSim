// File: src/components/GanttChart.jsx

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Gantt from "frappe-gantt"; // Assuming this is the Gantt library being used

const GanttChart = ({ tasks, projectInfo, styLst }) => {

  //// useState Section
  const [parsedTasks, setParsedTasks] = useState([]);

  //// useEffect Section
  // useEffect 1
  useEffect(() => {
    const calculateTaskDates = () => {     
      if (!projectInfo.startDate) {
        console.error("Project start date is missing.");
        return [];
      }
      const projectStart = new Date(projectInfo.startDate);
      const taskMap = tasks.reduce((map, task) => {
        map[task.id] = task;
        return map;
      }, {});
      return tasks.map((task) => {
        const durationInDays = parseFloat(task.duration) || 1;
        const predecessor = task.predecessor ? taskMap[task.predecessor] : null;
        let startDate = new Date(projectStart);
        if (predecessor && predecessor.endDate) {
          startDate = new Date(predecessor.endDate);
          startDate.setDate(startDate.getDate() + 1); // Start the day after the predecessor ends
        }
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + durationInDays - 1);
        return {
          id: task.id,
          name: task.name || "Unnamed Task",
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
          progress: 0,
          dependencies: task.predecessor || "",
        };
      });
    };
    const updatedTasks = calculateTaskDates();
    setParsedTasks(updatedTasks);
  }, [tasks, projectInfo]);
  // useEffect 2
  useEffect(() => {
    if (parsedTasks.length > 0) {
      const gantt = new Gantt("#gantt", parsedTasks, {
        view_mode: "Day",
        language: "en",
        bar_height: 20,
        padding: 18,
        custom_popup_html: null, // Add custom popup HTML if needed
      });
    }
  }, [parsedTasks]);

  //// JSX Return
  return (
    <div>
      <h2 className={styLst.title}>Gantt Chart</h2>
      <div
        id="gantt"
      ></div>
    </div>
  );
};

GanttChart.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      duration: PropTypes.string.isRequired,
      predecessor: PropTypes.string,
    })
  ).isRequired,
  projectInfo: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
  }).isRequired,
  styLst: PropTypes.object.isRequired,
};

export default GanttChart;
