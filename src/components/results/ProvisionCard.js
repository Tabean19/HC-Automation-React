import React, { Fragment, useState } from 'react';

export const ProvisionCard = ({ app }) => {
  const [isActive, setActive] = useState(app.is_running);

  const handleToggle = () => setActive(!isActive);

  return (
    <Fragment>
      <li>{app.name}</li>{' '}
      {isActive ? (
        <i className='fas fa-toggle-on fa-3x' onClick={handleToggle}></i>
      ) : (
        <i className='fas fa-toggle-off fa-3x' onClick={handleToggle}></i>
      )}
    </Fragment>
  );
};

export default ProvisionCard;
