import React, { useEffect, useRef } from 'react';

const GanttChart = ({ tasks }) => {
  const ganttRef = useRef(null);

  useEffect(() => {
    if (tasks.length > 0) {
      // Ensure Gantt is available
      const Gantt = window.Gantt;
      if (!Gantt) {
        console.error('Gantt is not available. Ensure the CDN link is added.');
        return;
      }

      // Prepare tasks for Gantt
      const ganttTasks = tasks.map((task) => ({
        id: task.id,
        name: task.name,
        start: task.startDate,
        end: task.endDate,
        progress: 100,
        dependencies: task.predecessor
          ? task.predecessor.split(',').map(Number)
          : [],
      }));

      // Initialize Gantt
      const ganttInstance = new Gantt(ganttRef.current, ganttTasks, {
        view_modes: ['Day', 'Week', 'Month'],
        bar_height: 20,
        padding: 18,
        custom_popup_html: (task) =>
          `<b>${task.name}</b><br>${task.start} - ${task.end}`,
      });

      // Cleanup
      return () => {
        ganttInstance.destroy();
      };
    }
  }, [tasks]);

  return (
    <div>
      <h2>Gantt Chart</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Add tasks to see the Gantt chart.</p>
      ) : (
        <div ref={ganttRef} className="gantt-container"></div>
      )}
    </div>
  );
};

export default GanttChart;
