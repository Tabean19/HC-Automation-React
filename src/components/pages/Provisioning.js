import React, { useContext, useEffect } from 'react';
import ProvisionItem from '../results/ProvisionItem';
import AppContext from '../../context/appContext';

export const Provisioning = () => {
  const appContext = useContext(AppContext);
  const { getApps, results, getConfigs } = appContext;

  useEffect(() => {
   
      getApps();
      getConfigs();
    
  }, []);

  return (
    <div className='container'>
      <h2>ECC</h2>
      <div className='ecc-container'>
        <ProvisionItem env={'ECC'} site={'Beaverton'} />
        <ProvisionItem env={'ECC'} site={'Smyrna'} />
      </div>
      <h2>SHARED</h2>
      <div className='shared-container'>
        <ProvisionItem env={'Shared'} site={'Beaverton'} />
        <ProvisionItem env={'Shared'} site={'Smyrna'} />
      </div>
      <h2>MISC</h2>
      <div className="shared-container">
        <ProvisionItem env={"Misc"} site={"Misc"} />
      </div>
    </div>
  );
};

export default Provisioning;
