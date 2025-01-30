// File: src/components/TaskInput.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskInput = ({ tasks, setTasks, styLst }) => {

  const initialValues = {
    id: 0,
    name: "",
    duration: "1 day",
    predecessor: "",
    distributionType: "normal",
    mean: "",
    standardDeviation: "",
  };

  const durationRegex = /^(\d+(\.\d+)?)\s*(s|sec|secs|second|seconds|m|min|mins|minute|minutes|h|hr|hour|hours|d|dy|day|days|w|wk|week|weeks|mt|mon|month|months|y|yr|year|years)$/i;

  const parseDuration = (input) => {
    const match = input.match(durationRegex);
    if (!match) return NaN;

    const value = parseFloat(match[1]);
    const unit = match[3].toLowerCase();

    switch (unit) {
      case "s": case "sec": case "secs": case "second": case "seconds":
        return value / 86400; // Convert to days
      case "m": case "min": case "mins": case "minute": case "minutes":
        return value / 1440; // Convert to days
      case "h": case "hr": case "hour": case "hours":
        return value / 24; // Convert to days
      case "d": case "dy": case "day": case "days":
        return value;
      case "w": case "wk": case "week": case "weeks":
        return value * 7;
      case "mt": case "mon": case "month": case "months":
        return value * 30;
      case "y": case "yr": case "year": case "years":
        return value * 365;
      default:
        return NaN;
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Task Name is required"),
    duration: Yup.string()
      .matches(durationRegex, "Invalid duration format")
      .required("Duration is required"),
    mean: Yup.number()
      .typeError("Mean must be a number")
      .nullable(),
    standardDeviation: Yup.number()
      .typeError("Standard Deviation must be a number")
      .nullable(),
  });

  const onSubmit = (values, { resetForm }) => {

    const parsedDuration = parseDuration(values.duration);
    if (isNaN(parsedDuration)) {
      alert("Invalid duration format");
      return;
    }
    
    const newTask = {
      id: Date.now(), // Generate unique ID for the task
      name: values.name,
      duration: values.duration,
      predecessor: values.predecessor,
      distributionType: values.distributionType,
      mean: values.mean ? parseFloat(values.mean) : null,
      standardDeviation: values.standardDeviation ? parseFloat(values.standardDeviation) : null,
    };

    setTasks([...tasks, newTask]);
    resetForm();
  };

  return (

    <div className={styLst.form} >

      <h2 className={styLst.title} >Task Input</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={styLst.group} >

          <label 
            htmlFor="name" 
            className={styLst.lbl} >Task Name:</label>
          <Field 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Task Name" 
            className={styLst.lbl}
          />
          <ErrorMessage name="name" component="div" className={styLst.errMsg}  />

          <label htmlFor="duration" className={styLst.lbl}>Task Length:</label>
          <Field
            type="text"
            id="duration"
            name="duration"
            placeholder="Task Length (e.g., 1 day)"
            className={styLst.lbl}
          />
          <ErrorMessage name="duration" component="div" className={styLst.errMsg} />

          <label htmlFor="taskPredecessor" className={styLst.lbl}>Task Predecessor:</label>
          <Field
            type="text"
            id="taskPredecessor"
            name="taskPredecessor"
            placeholder="Task Predecessor (Task ID)"
            className={styLst.lbl}
          />

          <label htmlFor="distributionType" className={styLst.lbl}>Distribution Type:</label>
          <Field 
            as="select" 
            id="distributionType" 
            name="distributionType" 
            className={styLst.lbl}
          >
            <option value="normal">Normal</option>
            <option value="uniform">Uniform</option>
            <option value="exponential">Exponential</option>
            <option value="triangular">Triangular</option>
            <option value="beta">Beta</option>
          </Field>

          <label htmlFor="mean" className={styLst.lbl}>Mean:</label>
          <Field 
            type="number" 
            id="mean" 
            name="mean" 
            placeholder="Mean" 
            className={styLst.lbl}
          />
          <ErrorMessage name="mean" component="div" className={styLst.errMsg} />

          <label htmlFor="standardDeviation" className={styLst.lbl} >Standard Deviation:</label>
          <Field
            type="number"
            id="standardDeviation"
            name="standardDeviation"
            placeholder="Standard Deviation"
            className={styLst.lbl}
          />
          <ErrorMessage name="standardDeviation" component="div" className={styLst.errMsg} />

          <button type="submit" className={styLst.btnPrim} >Add Task</button>
        </Form>
      </Formik>
    </div>
  );
};

TaskInput.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default TaskInput;
