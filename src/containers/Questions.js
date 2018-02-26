import React, { Component } from "react"
import Proptypes from "prop-types"
import Question from "../components/Question"

class Questions extends Component {
  static propTypes = {}
  render() {
    const { questions } = this.props
    return (
      <div>
        {questions.map(({ description, survey_responses }) => (
          <Question description={description} surveyResponse={survey_responses} />
        ))}
      </div>
    )
  }
}

export default Questions
