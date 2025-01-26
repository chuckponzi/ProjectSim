// File: src/components/ProjectInfo.jsx
import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProjectInfo = ({ projectInfo, setProjectInfo }) => {
  const initialValues = { ...projectInfo };

  const validationSchema = Yup.object({
    name: Yup.string().required("Project name is required"),
    startDate: Yup.string().required("Start date is required"),
    calendar: Yup.string().oneOf(["default", "yearRound"], "Invalid calendar type"),
  });

  const onSubmit = (values) => {
    setProjectInfo(values); // Update the parent state with form values
  };

  return (
    <div className="project-info">
      <h2>Project Info</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Project Name:</label>
            <Field type="text" id="name" name="name" placeholder="Enter project name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <Field type="date" id="startDate" name="startDate" />
            <ErrorMessage name="startDate" component="div" className="error" />
          </div>

          <div className="form-group">
            <label>Calendar Options:</label>
            <div>
              <label>
                <Field type="radio" name="calendar" value="default" />
                Default: 5 days/week, 10 hours/day
              </label>
              <label>
                <Field type="radio" name="calendar" value="yearRound" />
                Year Round: 7 days/week, 24 hours/day
              </label>
            </div>
            <ErrorMessage name="calendar" component="div" className="error" />
          </div>

          <button type="submit">Save Changes</button>
        </Form>
      </Formik>
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
