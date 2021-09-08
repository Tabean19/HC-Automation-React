import React, { useContext, useEffect } from 'react';
import ScriptContext from '../../context/scriptContext'
import ScriptResultItem from '../results/ScriptResultItem'


export const Scripts = () => {
  const scriptContext = useContext(ScriptContext)
  const { getScripts, results } = scriptContext
  useEffect(() => {
    if (!results) {
      getScripts();
    }
    const timer = setInterval(() => {
      getScripts();
    }, 30000);
  }, []);

  return (
    <div className='container'>
      <h2>Scripts</h2>
        <ScriptResultItem/>
    </div>
  );
};

export default Scripts;
