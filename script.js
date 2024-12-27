// Initialize variables
let tasks = [];
let taskIdCounter = 1;
let selectedUnit = "d";
let isDragging = false;
let startX;
let startInputWidth;

// Show the selected input tab
function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.style.display = "none";
    });
    document.getElementById(tabId).style.display = "block";

    document.querySelectorAll(".tabs .tab-button").forEach(button => {
        button.classList.remove("active");
    });
    document.querySelector(`.tabs .tab-button[onclick="showTab('${tabId}')"]`).classList.add("active");
}

// Show the selected output tab
function showOutputTab(tabId) {
    document.querySelectorAll(".output-tab-content").forEach(tab => {
        tab.style.display = "none";
    });
    document.getElementById(tabId).style.display = "block";

    document.querySelectorAll(".output-section .tab-button").forEach(button => {
        button.classList.remove("active");
    });
    document.querySelector(`.output-section .tab-button[onclick="showOutputTab('${tabId}')"]`).classList.add("active");
}

// Ensure Task Input and Task List tabs are selected by default on page load
document.addEventListener("DOMContentLoaded", () => {
    showTab("taskInput");
    showOutputTab("taskListTab");
});

// Add a task
function addTask() {
    const taskName = document.getElementById("taskName").value.trim();
    const taskLength = parseDuration(document.getElementById("taskLength").value.trim());
    const taskPredecessor = document.getElementById("taskPredecessor").value.trim();
    const distributionType = document.getElementById("distributionType").value;
    const mean = document.getElementById("mean").value;
    const standardDeviation = document.getElementById("standardDeviation").value;

    if (!taskName || isNaN(taskLength)) {
        alert("Please provide valid task information.");
        return;
    }

    const startDate = calculateStartDate(taskPredecessor);
    const endDate = calculateEndDate(startDate, taskLength);

    const task = {
        id: taskIdCounter,
        name: taskName,
        length: taskLength,
        predecessor: taskPredecessor,
        distributionType,
        mean: mean ? parseFloat(mean) : null,
        standardDeviation: standardDeviation ? parseFloat(standardDeviation) : null,
        startDate,
        endDate
    };

    tasks.push(task);
    taskIdCounter++;
    updateTaskList();
    resetForm();
    generateGanttChart();
    updateTimelineView();
}

// Parse duration input
function parseDuration(input) {
    const regex = /^(\d+(\.\d+)?)(\s?(d|h|w|m|y|day|days|hour|hours|week|weeks|month|months|year|years|mo|dy))?$/i;
    const match = input.match(regex);

    if (!match) {
        document.getElementById("lengthWarning").style.display = "inline";
        return NaN;
    }

    document.getElementById("lengthWarning").style.display = "none";
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
}

// Reset the form
function resetForm() {
    document.getElementById("taskName").value = "";
    document.getElementById("taskLength").value = "1 day";
    document.getElementById("taskPredecessor").value = "";
    document.getElementById("distributionType").value = "normal";
    document.getElementById("mean").value = "";
    document.getElementById("standardDeviation").value = "";
}

// Calculate start date for a task
function calculateStartDate(predecessors) {
    const projectStartDate = document.getElementById("projectStartDate").value || new Date().toISOString().split("T")[0];
    if (!predecessors) return projectStartDate;

    const predecessorIds = predecessors.split(",").map(id => parseInt(id.trim(), 10));
    let latestEndDate = projectStartDate;

    predecessorIds.forEach(predecessorId => {
        const predecessorTask = tasks.find(task => task.id === predecessorId);
        if (predecessorTask && predecessorTask.endDate > latestEndDate) {
            latestEndDate = predecessorTask.endDate;
        }
    });

    return latestEndDate;
}

// Calculate end date for a task
function calculateEndDate(startDate, taskLength) {
    const start = new Date(startDate);
    start.setDate(start.getDate() + Math.ceil(taskLength));
    return start.toISOString().split("T")[0];
}

// Update the task list
function updateTaskList() {
    const taskList = document.getElementById("taskList");
    const fragment = document.createDocumentFragment();

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div><strong>Task ID:</strong> ${task.id}</div>
            <div><strong>Name:</strong> ${task.name}</div>
            <div><strong>Length:</strong> ${task.length.toFixed(2)} ${selectedUnit}</div>
            <div><strong>Predecessor:</strong> ${task.predecessor || "None"}</div>
            <div><strong>Start Date:</strong> ${task.startDate}</div>
            <div><strong>End Date:</strong> ${task.endDate}</div>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        fragment.appendChild(li);
    });

    taskList.innerHTML = "";
    taskList.appendChild(fragment);
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTaskList();
    generateGanttChart();
    updateTimelineView();
}

// Clear all tasks
function clearAllTasks() {
    tasks = [];
    taskIdCounter = 1;
    updateTaskList();
    generateGanttChart();
    updateTimelineView();
}

// Generate Gantt Chart
function generateGanttChart() {
    const ganttContainer = document.getElementById("ganttChart");
    ganttContainer.innerHTML = '';

    const ganttTasks = tasks.map(task => ({
        id: task.id,
        name: task.name,
        start: task.startDate,
        end: task.endDate,
        dependencies: task.predecessor ? task.predecessor.split(",") : []
    }));

    if (ganttTasks.length > 0) {
        new Gantt("#ganttChart", ganttTasks, {
            view_mode: "Day",
            date_format: "YYYY-MM-DD",
            custom_popup_html: task => `
                <div class="gantt-popup">
                    <h5>${task.name}</h5>
                    <p><strong>Start:</strong> ${task.start}</p>
                    <p><strong>End:</strong> ${task.end}</p>
                </div>
            `
        });
    } else {
        ganttContainer.innerHTML = "<p>No tasks available to display in the Gantt chart.</p>";
    }
}

// Populate Timeline View
function updateTimelineView() {
    const timelineContainer = document.querySelector(".timeline-content");
    timelineContainer.innerHTML = "";

    if (tasks.length === 0) {
        timelineContainer.innerHTML = "<p>No tasks available for timeline view.</p>";
        return;
    }

    tasks.forEach(task => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.style.width = `${task.length * 50}px`;
        item.innerHTML = `
            <strong>${task.name}</strong>
            <span>${task.startDate} - ${task.endDate}</span>
        `;
        timelineContainer.appendChild(item);
    });
}

// Start dragging the divider
function startDrag(event) {
    isDragging = true;
    startX = event.clientX;

    const inputSection = document.querySelector(".input-section");
    startInputWidth = inputSection.getBoundingClientRect().width;

    // Attach event listeners for dragging and stopping
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
}

function onDrag(event) {
    if (!isDragging) return;

    const dx = event.clientX - startX;
    const container = document.querySelector(".app-container");
    const inputSection = document.querySelector(".input-section");
    const outputSection = document.querySelector(".output-section");

    const containerWidth = container.getBoundingClientRect().width;
    const newInputWidth = ((startInputWidth + dx) / containerWidth) * 100;
    const newOutputWidth = 100 - newInputWidth;

    if (newInputWidth > 20 && newOutputWidth > 20) {
        inputSection.style.flex = `0 0 ${newInputWidth}%`;
        outputSection.style.flex = `0 0 ${newOutputWidth}%`;
    }
}

function stopDrag() {
    if (isDragging) {
        isDragging = false;
        window.removeEventListener("mousemove", onDrag);
        window.removeEventListener("mouseup", stopDrag);
    }
}
