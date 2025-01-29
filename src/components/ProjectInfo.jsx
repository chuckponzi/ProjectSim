// File: src/components/ProjectInfo.jsx
import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProjectInfo = ({ projectInfo, setProjectInfo, styLst }) => {
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
    
    <div className={styLst.form} >

      <h2 className={styLst.title} >Project Info</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={styLst.group}>
          <div>
            <label htmlFor="name" className={styLst.lbl} >Project Name:</label>
            <Field type="text" id="name" name="name" placeholder="Enter project name" className={styLst.lbl} />
            <ErrorMessage name="name" component="div" className={styLst.errMsg} />
          </div>

          <div>
            <label htmlFor="startDate" className={styLst.lbl} >Start Date:</label>
            <Field type="date" id="startDate" name="startDate" className={styLst.lbl} />
            <ErrorMessage name="startDate" component="div" />
          </div>

          <div>
            <label className={styLst.lbl} >Calendar Options:</label>
            <div>
              <label className={styLst.lbl} >
                <Field type="radio" name="calendar" value="default" className={styLst.lbl} />
                Default: 5 days/week, 10 hours/day
              </label>
              <label className={styLst.lbl} >
                <Field type="radio" name="calendar" value="yearRound" className={styLst.lbl} />
                Year Round: 7 days/week, 24 hours/day
              </label>
            </div>
            <ErrorMessage name="calendar" component="div" className={styLst.errMsg} />
          </div>
          <div className={styLst.btnGrp}>
            <button type="reset" className={styLst.btnMut} >
              Reset
            </button>
            <button type="submit" className={styLst.btnPrim} >
              Save Changes
            </button>
          </div>
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
  styLst: PropTypes.object.isRequired,
};

export default ProjectInfo;
