import React from "react"
import Proptypes from "prop-types"

export default function Question({ question, averageRating }) {
  return (
    <div className="QuestionCon">
      <p>{question}</p>
      <p>{averageRating}</p>
    </div>
  )
}

//Question.propTypes = {
//  : PropTypes.
//}
