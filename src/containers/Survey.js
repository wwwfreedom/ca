import React, { Component } from "react"
import axios from "axios"
import Proptypes from "prop-types"
import Questions from "./Questions"

// rounding function given a number will round the number witht the given precision
function precisionRound(number, precision) {
  const factor = 10 ** precision
  return Math.round(number * factor) / factor
}

// given an array of object with property response_content(rating) and participantCount => averageRating for the question
function averageRating(responseArr, participantCount) {
  const ratingTotal = responseArr.reduce((accu, currentVal) => {
    const rating = currentVal.response_content && parseInt(currentVal.response_content, 10)
    return accu + rating
  }, 0)
  return precisionRound(ratingTotal / participantCount, 2)
}

// simplify data from backend into essential info needed for the ui
function transformData(obj) {
  const { name, participant_count, response_rate, submitted_response_count, themes } = obj
  const formattedThemes = themes.map(({ name, questions }) => {
    const formatedQuestions = questions.map(({ description, survey_responses }) => {
      return {
        question: description,
        averageRating: averageRating(survey_responses, participant_count),
      }
    })
    return {
      questionTheme: name,
      formatedQuestions,
    }
  })

  return {
    surveyName: name,
    participationRate: precisionRound(response_rate * 100, 2),
    formattedThemes,
  }
}

class Survey extends Component {
  static propTypes = {
    match: Proptypes.object.isRequired,
    baseResourceUrl: Proptypes.string.isRequired,
  }

  state = {
    surveyName: null,
    participationRate: null,
    formattedThemes: null,
    loading: false,
    error: false,
  }

  componentDidMount() {
    const { match, baseResourceUrl } = this.props
    this.setState({ loading: true })
    axios
      .get(`${baseResourceUrl}${match.url}`)
      .then(({ data }) => {
        if (data && Object.keys(data.survey_result_detail).length !== 0) {
          const transformedData = transformData(data.survey_result_detail)
          this.setState({
            loading: false,
            error: false,
            ...transformedData,
          })
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: true, loading: false })
      })
  }

  render() {
    const { surveyName, participationRate, formattedThemes, loading, error } = this.state
    return (
      <div className="SurveyCon">
        <div>
          {surveyName}
          <br />
          {participationRate}
          <br />
        </div>
        {formattedThemes &&
          formattedThemes.map(({ questionTheme, formatedQuestions }) => (
            <Questions
              key={questionTheme}
              questions={formatedQuestions}
              questionTheme={questionTheme}
            />
          ))}
        {loading && "yolo loading now"}
        {error && "could not get data from server please refresh moment later"}
      </div>
    )
  }
}

export default Survey
