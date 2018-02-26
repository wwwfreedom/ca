import React, { Component } from "react"
import Proptypes from "prop-types"
import Question from "../components/Question"

class Questions extends Component {
  static propTypes = {}
  render() {
    const { questions, questionTheme } = this.props
    return (
      <div>
        <h3>{questionTheme}</h3>
        {questions.map(({ question, averageRating }) => (
          <Question key={question} question={question} averageRating={averageRating} />
        ))}
      </div>
    )
  }
}

export default Questions
