import React, { useContext, useEffect } from "react";
import SurveyItem from "../results/SurveyItem";
import AppContext from "../../context/appContext";
import Spinner from "../layout/spinner";

export const Survey = () => {
    const appContext = useContext(AppContext);
    const { surveys, getSurveys } = appContext;

    useEffect(() => {
        if (!surveys) {
            getSurveys();
        }
        const timer = setInterval(() => {
            getSurveys();
        }, 30000);
    }, []);



    if (!surveys) {
        return (
            <div className="container">
                <h2>Survey</h2>
                <div className="scripts-container loading">
                    <SurveyItem surveys={surveys} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <h2>Survey</h2>
                <div className="shared-container">
                    <SurveyItem surveys={surveys} />
                </div>
            </div>
        );
    }
};

export default Survey;
