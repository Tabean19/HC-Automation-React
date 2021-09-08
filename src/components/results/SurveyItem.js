import React from "react";
import SurveyCard from "./SurveyCard";
import Spinner from "../layout/spinner";


const SurveyItem = ({ surveys }) => {


    if (!surveys) {
        return (
            <div className="scripts-container loading">
                <ul className="scripts">
                    <Spinner />
                </ul>
            </div>

        );
    } else {
        return (

            <div className="scripts-container">
                <ul className="scripts">
                    {surveys.map((survey) => (
                        <SurveyCard survey={survey} key={survey.id} />
                    ))}
                </ul>
            </div>
        );
    }
};

export default SurveyItem;