import React from 'react'
import Proptypes from 'prop-types'

export default function Question({ description, surveyResponse }) {
    console.log(description, surveyResponse)
    let avgRating = surveyResponse.reduce()
    return (
        <div className="QuestionCon">
            <p>{description}</p>
        </div>
    )
}

//Question.propTypes = {
//  : PropTypes.
//}
