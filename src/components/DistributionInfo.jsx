import React from 'react';
import PropTypes from "prop-types";

import normDist from "../assets/normDist.png";
import uniDist from "../assets/uniDist.png";
import expDist from "../assets/expDist.png";
import triDist from "../assets/triDist.png";
import bestDist from "../assets/betaDist.png";

const distributionData = [
  {
    name: "Normal Distribution",
    description: "A symmetric, bell-shaped curve, defined by the mean and standard deviation.",
    image: normDist
  },
  {
    name: "Uniform Distribution",
    description: "All outcomes are equally likely within a range.",
    image: uniDist
  },
  {
    name: "Exponential Distribution",
    description: "Describes the time between events in a Poisson process.",
    image: expDist
  },
  {
    name: "Triangular Distribution",
    description: "A continuous distribution defined by a minimum, mode, and maximum.",
    image: triDist
  },
  {
    name: "Beta Distribution",
    description: "Models probabilities, defined by shape parameters alpha and beta.",
    image: bestDist
  },
];

const DistributionInfo = ({ styLst }) => {
  return (
    <div className={styLst.form} >
      <h2 className={styLst.title} >Distribution Information</h2>
      <ul className={styLst.ul2} >
        {distributionData.map((distribution, index) => (
          <li key={index} className={styLst.li1} >
            <h3 className={styLst.h_1}>{distribution.name}</h3>
            <p className={styLst.p1}>{distribution.description}</p>
            <div className={styLst.div5}>
              <img src={distribution.image} alt={distribution.name} className={styLst.img1}/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

DistributionInfo.propTypes = {
  styLst: PropTypes.object.isRequired,
};

export default DistributionInfo;
