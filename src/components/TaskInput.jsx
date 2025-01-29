// File: src/components/TaskInput.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskInput = ({ tasks, setTasks, styLst }) => {

  const initialValues = {
    taskName: "",
    taskLength: "1 day",
    taskPredecessor: "",
    distributionType: "normal",
    mean: "",
    standardDeviation: "",
  };

  const validationSchema = Yup.object({
    taskName: Yup.string().required("Task Name is required"),
    taskLength: Yup.string().required("Task Length is required"),
    mean: Yup.number()
      .typeError("Mean must be a number")
      .nullable(),
    standardDeviation: Yup.number()
      .typeError("Standard Deviation must be a number")
      .nullable(),
  });

  const onSubmit = (values, { resetForm }) => {

    const task = {
      name: values.taskName,
      length: values.taskLength,
      predecessor: values.taskPredecessor,
      distributionType: values.distributionType,
      mean: values.mean ? parseFloat(values.mean) : null,
      standardDeviation: values.standardDeviation
        ? parseFloat(values.standardDeviation)
        : null,
    };

    setTasks((prevTasks) => [...prevTasks, task]);
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
          <label htmlFor="taskName" className={styLst.lbl} >Task Name:</label>
          <Field 
            type="text" 
            id="taskName" 
            name="taskName" 
            placeholder="Task Name" 
            className={styLst.lbl}
          />
          <ErrorMessage name="taskName" component="div" className={styLst.errMsg}  />

          <label htmlFor="taskLength" className={styLst.lbl}>Task Length:</label>
          <Field
            type="text"
            id="taskLength"
            name="taskLength"
            placeholder="Task Length (e.g., 1 day)"
            className={styLst.lbl}
          />
          <ErrorMessage name="taskLength" component="div" className={styLst.errMsg} />

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
