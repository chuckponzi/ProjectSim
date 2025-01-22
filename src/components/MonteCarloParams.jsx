import React, { useState } from 'react';

const MonteCarloParams = ({ monteCarloParams, setMonteCarloParams }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMonteCarloParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Monte Carlo Simulation Parameters</h2>
      <div>
        <label htmlFor="numSimulations">Number of Simulations:</label>
        <input
          type="number"
          id="numSimulations"
          name="numSimulations"
          value={monteCarloParams.numSimulations}
          onChange={handleChange}
          placeholder="Enter number of simulations"
        />
      </div>
      <div>
        <label htmlFor="confidenceInterval">Confidence Interval (%):</label>
        <input
          type="number"
          id="confidenceInterval"
          name="confidenceInterval"
          value={monteCarloParams.confidenceInterval}
          onChange={handleChange}
          placeholder="e.g., 95"
        />
      </div>
      <div>
        <label htmlFor="outputSettings">Output Settings:</label>
        <select
          id="outputSettings"
          name="outputSettings"
          value={monteCarloParams.outputSettings}
          onChange={handleChange}
        >
          <option value="average">Average</option>
          <option value="minMax">Min/Max</option>
          <option value="percentile">Percentile</option>
        </select>
      </div>
    </div>
  );
};

export default MonteCarloParams;
