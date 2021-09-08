import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ScriptContext from '../../context/scriptContext';

export const ScriptResultCard = ({ script }) => {
  const scriptContext = useContext(ScriptContext);
  const { setActiveScript } = scriptContext;

  if (!script.currently_running) {
    return (
      <Link to={`/scripts/${script.id}`}>
        <li className='script-result off' onClick={() => setActiveScript(script)}>
          <i className='fas fa-power-off fa-2x'></i>
          <div className='script-name-container'>{script.script_name}
          </div>
        </li>
      </Link>

    );
  } else {
    return (
      <Link to={`/scripts/${script.id}`}>
        <li className={'script-result Pass'} onClick={() => setActiveScript(script)}>
        <i><div className='lds-ring loader'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div></i>
          <div className='script-name-container'>{script.script_name}</div>
        </li>
      </Link>
    );
  }
};

export default ScriptResultCard;
