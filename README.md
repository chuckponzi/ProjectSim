# Gantt Chart Component

## Overview
This component is a React-based implementation of a Gantt chart using the `frappe-gantt` library. It provides the ability to visualize tasks with start and end dates, durations, and dependencies. Users can adjust the chart's width and height dynamically via sliders.

---

## Features
1. **Task Parsing and Validation**:
   - Automatically calculates task start and end dates based on project start date, task duration, and dependencies.
   - Handles empty task lists gracefully.

2. **Dynamic Resizing**:
   - Users can adjust the chart's width and height using slider inputs.
   - Respects fixed size dimensions to avoid automated resizing issues.

3. **React-Friendly Integration**:
   - Uses `useRef` and `useEffect` to ensure proper lifecycle management.
   - Avoids direct DOM manipulation, fully relying on React's state and ref management.

4. **Styling**:
   - Styled with Tailwind CSS for modern, responsive design.

---

## PropTypes
The component expects the following props:

### `tasks` (Required)
- **Type**: Array of objects
- **Description**: Represents the list of tasks to display in the Gantt chart.
- **Structure**:
  ```javascript
  [
    {
      id: "string",          // Unique identifier for the task
      name: "string",        // Task name
      duration: "string",    // Duration in days
      predecessor: "string"  // ID of the preceding task
    }
  ]
  ```

### `projectInfo` (Required)
- **Type**: Object
- **Description**: Contains metadata about the project.
- **Structure**:
  ```javascript
  {
    startDate: "YYYY-MM-DD" // Start date of the project
  }
  ```

### `styLst` (Required)
- **Type**: Object
- **Description**: Contains Tailwind CSS classes for styling.

---

## State Management
### `parsedTasks`
- **Type**: Array
- **Description**: Derived from the `tasks` prop, calculates each task's start and end dates.

### `size`
- **Type**: Object
- **Description**: Tracks the current width and height of the Gantt chart.
- **Structure**:
  ```javascript
  {
    width: number, // Chart width in pixels
    height: number // Chart height in pixels
  }
  ```

---

## Implementation Details
### Task Parsing Logic
The `calculateTaskDates` function processes tasks as follows:
- Ensures the project start date is defined.
- Maps tasks by ID for efficient lookup.
- Calculates task start and end dates based on:
  - Project start date.
  - Task duration.
  - Predecessor dependencies.

### Gantt Chart Rendering
- Uses `frappe-gantt` to create the Gantt chart inside a `div` with `ref`.
- React state (`parsedTasks` and `size`) determines when the chart updates.

### Resizing
- User-adjustable via sliders.
- Prevents automated resizing by relying solely on user input.

---

## Usage
### Example
```javascript
<GanttChart
  tasks={tasks}
  projectInfo={{ startDate: "2025-02-01" }}
  styLst={styLst}
/>
```

---

## Development Notes
### Error Handling
- Handles missing project start date or tasks gracefully with console error messages.
- Ensures no `frappe-gantt` instance is created if `tasks` is empty.

### Known Limitations
- `frappe-gantt` does not provide a `destroy()` method; chart cleanup relies on React state management.

---

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue on GitHub.

---

## License
This project is licensed under the MIT License.
