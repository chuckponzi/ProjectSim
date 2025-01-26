import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MonteCarloParams = ({ monteCarloParams, setMonteCarloParams }) => {

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
    <div className="monte-carlo-params">
      <h2>Monte Carlo Parameters</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="numSimulations">Number of Simulations:</label>
            <Field
              type="number"
              id="numSimulations"
              name="numSimulations"
              placeholder="Enter number of simulations"
            />
            <ErrorMessage
              name="numSimulations"
              component="div"
              className="error"
            />
          </div>
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  );
};

//MonteCarloParams.propTypes = {
//  monteCarloParams: PropTypes.number,
//  setMonteCarloParams: PropTypes.func.isRequired,
//};

export default MonteCarloParams;
