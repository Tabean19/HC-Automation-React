import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ScriptContext from "../../context/scriptContext";

export const ScriptDetails = ({ match }) => {
    const scriptContext = useContext(ScriptContext);
    const { active_script, clearActiveScript, runScript } = scriptContext;

    const { script_name, currently_running, script_detail, script_cmd_line, last_execution } = active_script;
    useEffect(() => {
        window.scrollTo(0, 0)
        //eslint-disable-next-line
    }, [])

    const lastRun = new Date(last_execution).toDateString();
    



    return (
        <div className="container">
            <Link to="/scripts">
                <div className="btn" onClick={clearActiveScript}>
                    <i className="fas fa-arrow-left"></i> Back
          </div>
            </Link>
            <h1>{script_name}</h1>
            <div className="details-container">
                <h1 className="script-details-header">Details</h1>
                <h2 className="script-details"><span className="script-details-label">Description</span>{script_detail}</h2>
                <h2 className="script-details"><span className="script-details-label">Command Line Arguments</span><codeblock>{script_cmd_line}</codeblock></h2>
                <h2 className="script-details"><span className="script-details-label">Currently Running</span>{currently_running ? 'Yes' : 'No'}</h2>
                <h2 className="script-details"><span className="script-details-label">Last Run</span>{lastRun}</h2>
            </div>
            <div className="btn-container">
                {currently_running ?
                    <div className="script-btn run" >
                    <div className="play-loader">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </div> : <div className="script-btn run" onClick={() => runScript(active_script)}><i className="fas fa-play"></i>Run Script</div>
                }

                <div className="script-btn edit" onClick={window.scrollTo(0, 0)}><i className="fas fa-edit"></i>Edit Script</div>
            </div>

        </div>
    )
};

export default ScriptDetails;
