import React, { useContext, useEffect } from 'react';
import ResultItem from '../results/ResultItem';
import AppContext from '../../context/appContext';

export const Monitoring = () => {
  const appContext = useContext(AppContext);
  const { getApps, results } = appContext;

  useEffect(() => {
    if (!results) {
      getApps();
    }
    const timer = setInterval(() => {
      getApps();
    }, 30000);
  }, []);

  return (
    <div className='container'>
      <h2>ECC</h2>
      <div className='ecc-container'>
        <ResultItem env={'ECC'} site={'Beaverton'} />
        <ResultItem env={'ECC'} site={'Smyrna'} />
      </div>
      <h2>SHARED</h2>
      <div className='shared-container'>
        <ResultItem env={'Shared'} site={'Beaverton'} />
        <ResultItem env={'Shared'} site={'Smyrna'} />
      </div>
    </div>
  );
};

export default Monitoring;
