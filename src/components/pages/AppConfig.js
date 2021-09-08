import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from '../layout/spinner';
import AppContext from "../../context/appContext";

export const AppConfig = ({ match }) => {
    const appContext = useContext(AppContext);
    const { active_application, clearActiveApp, configs } = appContext;

    const [popupState, setPopupState] = useState(false);
    const [isFinished, setFinished] = useState(true);
    const [currentConfig, setCurrentConfig] = useState(
        {
            id: 0,
            name: "",
            app_type: "",
            app_url: "",
            log_folder_path: "",
            log_level: "",
            username: "",
            password: "",
            additional_cmd_line_args: {},
            schedule: 0
        },
    );

    useEffect(() => {
        if (currentConfig.id === 0) {
            const filterConfigs = configs.filter((config) => (config.id == active_application.id))[0];
            setCurrentConfig(filterConfigs);
        }
        //eslint-disable-next-line
    }, []);






    //destructuring of config object values
    const {
        id,
        name,
        app_type,
        app_url,
        log_folder_path,
        log_level,
        username,
        password,
        additional_cmd_line_args,
        schedule
    } = currentConfig;


    //handle submit event
    const handleSubmit = (e) => {
        e.preventDefault();
        setPopupState(true);
    }

    //handle form changes
    const onChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setCurrentConfig({
            ...currentConfig,
            [name]: value
        });

    }

    //post change in config to backend 
    const postConfigChange = async () => {
        setFinished(false);
        const data = JSON.stringify(currentConfig);

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        };
        const res = await fetch(`https://bvrtormon001.uspsprod.usps.gov:1337/api/configuration/update/${id}/`, options).then(() => {
            setFinished(true);
            setPopupState(false);
        });
    }



    return (
        <div className="container">
            <Link to="/provisioning">
                <div className="btn" onClick={() => clearActiveApp}>
                    <i className="fas fa-arrow-left"></i> Back
                </div>
            </Link>
            <h2>Application Configuration</h2>
            {id > 0 ?
                <form className="app-config-form" onSubmit={handleSubmit}>
                    <div className="input-label one">
                        <p>Id:</p>
                        <input className="form-input" type="text" value={id} />
                    </div>
                    <div className="input-label two">
                        <p>Name:</p>
                        <input className="form-input" type="text" value={name} name="name" onChange={(e) => onChange(e)} />
                    </div>
                    <div className="input-label three">
                        <p>Application Type:</p>
                        <input className="form-input" type="text" value={app_type} name="app_type" onChange={(e) => onChange(e)} />
                    </div>
                    <div className="input-label four">
                        <p>URL:</p>
                        <input className="form-input" type="text" value={app_url} name="app_url" onChange={(e) => onChange(e)} />
                    </div>
                    <div className="input-label five">
                        <p>Log path:</p>
                        <input className="form-input" type="text" value={log_folder_path} name="log_folder_path" onChange={(e) => onChange(e)} />
                    </div>
                    <div className="input-label six">
                        <p>Logging level:</p>
                        <input className="form-input" type="text" value={log_level} name="log_level" onChange={(e) => onChange(e)} />
                    </div>
                    <div className="input-label seven">
                        <p>Username:</p>
                        <input className="form-input" type="text" value={username} name="username" onChange={(e) => onChange(e)} />
                    </div>
                    <div className="input-label eight">
                        <p>Password:</p>
                        <input className="form-input" type="text" value={password} name="password" onChange={(e) => onChange(e)} />
                    </div>
                    <div className="input-label nine">
                        <p>Schedule:</p>
                        <select className="form-input"  name="schedule" onChange={(e) => onChange(e)} >
                            {schedule === null ? <option value="" selected>Never</option> : <option value="">Never</option>}                       
                            {schedule === 5 ? <option value="5" selected>Every 10 minutes</option> : <option value="5">Every 10 minutes</option>}                       
                            {schedule === 2 ? <option value="2" selected>Every 20 minutes</option> : <option value="2">Every 20 minutes</option>}                       
                            {schedule === 3 ? <option value="3" selected>Every 30 minutes</option> : <option value="3">Every 30 minutes</option>}                       
                            {schedule === 4 ? <option value="4" selected>Every 1 hour</option> : <option value="4">Every 1 hour</option>}                       
                            </select>
                    </div>
                    <div className="input-label ten">
                        <p>Additional command line arguments:</p>
                        <textarea className="form-input" type="textarea" name="additional_cmd_line_args" onChange={(e) => onChange(e)}>{JSON.stringify(additional_cmd_line_args)}</textarea>
                    </div>
                    <div className="input-label eleven">
                        <input className="form-submit form-btn" type="submit" value="Submit" />
                        <Link to="/provisioning"><input className="form-cancel form-btn" value="Cancel" onClick={() => clearActiveApp} /></Link>
                    </div>
                </form>
                : null}

            {
                //popup modal
                popupState ? <div className='popup'>
                    <div className='popup-open'>
                        <div className="popup-text-container">
                            <h2>Are you sure you would like to submit?</h2>
                            <p>These changes will become permanent.</p>
                        </div>
                        {isFinished ? null : <Spinner />}
                        <div className='popup-btn-container'>
                            <button className="form-btn form-submit" onClick={() => postConfigChange()}>Yes</button>
                            <button className="form-btn form-cancel" onClick={() => setPopupState(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
                    :
                    null
            }

        </div>
    )
};

export default AppConfig;
