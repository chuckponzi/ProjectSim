// File: src/components/GanttChart.jsx

import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Gantt from "frappe-gantt"; // Assuming this is the Gantt library being used

const GanttChart = ({ defaultTasks, tasks, projectInfo, styLst }) => {

  //// useRef Section ////
  // Gantt Container DOM Element
  const ganttRef = useRef(null);
  const ganttInstance = useRef(null);
  
  //// useState Section ////
  // Formatted Task List
  const [parsedTasks, setParsedTasks] = useState([]);
  // Gantt Container Size
  const [size, setSize] = useState({ width: 800, height: 600 });

  //// useEffect Section ////
  // useEffect - Task List Processing
  // Parse and calculate task dates
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
          startDate.setDate(startDate.getDate() + 1);
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
  
  // useEffect  - Gantt Chart Creation
  useEffect(() => {
    if (parsedTasks.length > 0) {
      // Cleanup previous Gantt instance if exists
      if (ganttInstance.current) {
        ganttInstance.current = null;
      }

      // Create new Gantt instance
      ganttInstance.current = new Gantt(ganttRef.current, parsedTasks, {
        view_mode: "Day",
        bar_height: 30,
        padding: 20,
      });
    }
  }, [parsedTasks, size]);

  //// JSX Return ////
  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col items-center">
          <label className={styLst.lbl} >Width: {size.width}px</label>
          <input
            type="range"
            min="600"
            max="1200"
            value={size.width}
            onChange={(e) => setSize({ ...size, width: parseInt(e.target.value, 10) })}
            className="w-40"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className={styLst.lbl} >Height: {size.height}px</label>
          <input
            type="range"
            min="400"
            max="800"
            value={size.height}
            onChange={(e) => setSize({ ...size, height: parseInt(e.target.value, 10) })}
            className="w-40"
          />
        </div>
      </div>
      <div
        className="border border-border rounded-lg shadow-md"
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
      >
        <div ref={ganttRef} id="gantt" className="w-full h-full"></div>
      </div>
    </div>
  );
};

//// Prop Validation ////
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

//// Component Export ////
export default GanttChart;