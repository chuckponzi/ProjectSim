import React from 'react';

const distributionData = [
  {
    name: 'Normal Distribution',
    description: 'A symmetric, bell-shaped curve, defined by the mean and standard deviation.',
    image: 'https://i.imgur.com/ePjTxRz.png',
  },
  {
    name: 'Uniform Distribution',
    description: 'All outcomes are equally likely within a range.',
    image: 'https://i.imgur.com/r1TLqRi.png',
  },
  {
    name: 'Exponential Distribution',
    description: 'Describes the time between events in a Poisson process.',
    image: 'https://i.imgur.com/vQ0ko2p.png',
  },
  {
    name: 'Triangular Distribution',
    description: 'A continuous distribution defined by a minimum, mode, and maximum.',
    image: 'https://i.imgur.com/VzN0ecL.png',
  },
  {
    name: 'Beta Distribution',
    description: 'Models probabilities, defined by shape parameters alpha and beta.',
    image: 'https://i.imgur.com/u1CCJk8.png',
  },
];

const DistributionInfo = () => {
  return (
    <div>
      <h2>Distribution Information</h2>
      <ul className="distribution-list">
        {distributionData.map((distribution, index) => (
          <li key={index} className="distribution-item">
            <h3>{distribution.name}</h3>
            <p>{distribution.description}</p>
            <div className="distribution-graphic">
              <img src={distribution.image} alt={distribution.name} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DistributionInfo;
