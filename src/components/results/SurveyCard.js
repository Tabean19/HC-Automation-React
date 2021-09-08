import React from 'react';


export const SurveyCard = ({ survey }) => {



    if (survey.status === null) {
        return (
            <li className={`script-result ${survey.status}`} >
                <i className='fas fa-times fa-2x'></i>
                <div className='script-name-container'>{survey.name}</div>
            </li>
        );
    } else {
        return (
            <li className={`script-result ${survey.status}`} >
                <i className='fas fa-check fa-2x'></i>
                <div className='script-name-container'>{survey.name}</div>
            </li>
        );
    }


};

export default SurveyCard;
