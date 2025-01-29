import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MonteCarloParams = ({ monteCarloParams, setMonteCarloParams, styLst }) => {

  const initialValues = {
    numSimulations: monteCarloParams.numSimulations || 1000, // Default to 1000 if undefined
  };

  const validationSchema = Yup.object({
    numSimulations: Yup.number()
      .min(1, "Must be at least 1 simulation")
      .required("Number of simulations is required"),
  });

  const onSubmit = (values) => {
    setMonteCarloParams({numSimulations: values.numSimulations});
  };

  return (

    <div className={styLst.form} 
    >
      <h2 className={styLst.title} >Monte Carlo Parameters</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={styLst.group} >
          <div>
            <label htmlFor="numSimulations" className={styLst.lbl} >Number of Simulations:</label>
            <Field
              type="number"
              id="numSimulations"
              name="numSimulations"
              placeholder="Enter number of simulations"
              className={styLst.input}
            />
            <ErrorMessage
              name="numSimulations"
              component="div"
              className={styLst.errMsg}
            />
          </div>
          <div className={styLst.btnGrp}>
            <button type="submit" className={styLst.btnPrim}>
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

MonteCarloParams.propTypes = {
  monteCarloParams: PropTypes.shape({
    numSimulations: PropTypes.number.isRequired,
  }).isRequired,
  setMonteCarloParams: PropTypes.func.isRequired,
  styLst: PropTypes.object.isRequired,
};

export default MonteCarloParams;
