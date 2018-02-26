import React from "react"
import Proptypes from "prop-types"

function precisionRound(number, precision) {
  const factor = 10 ** precision
  return Math.round(number * factor) / factor
}

export default function Question({ description, surveyResponse }) {
  const ratingTotal = surveyResponse.reduce((accu, currentVal) => {
    const rating = currentVal.response_content && parseInt(currentVal.response_content, 10)
    return accu + rating
  }, 0)
  const averageRating = precisionRound(ratingTotal / surveyResponse.length, 2)

  return (
    <div className="QuestionCon">
      <p>{description}</p>
      <p>{averageRating}</p>
    </div>
  )
}

//Question.propTypes = {
//  : PropTypes.
//}
