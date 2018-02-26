import React, { Component } from "react"
import axios from "axios"
import Proptypes from "prop-types"
import Questions from "./Questions"

function precisionRound(number, precision) {
  const factor = 10 ** precision
  return Math.round(number * factor) / factor
}

function averageRating(responseArr) {
  const numberOfParticipant = responseArr && responseArr.length
  const ratingTotal = responseArr.reduce((accu, currentVal) => {
    const rating = currentVal.response_content && parseInt(currentVal.response_content, 10)
    return accu + rating
  }, 0)
  return precisionRound(ratingTotal / numberOfParticipant, 2)
}

function formatData(obj) {
  console.log(obj)
  const { name, participant_count, response_rate, submitted_response_count, themes } = obj
  const formattedThemes = themes.map(({ name, questions }) => {
    const formatedQuestions = questions.map(({ description, survey_responses }) => {
      return {
        question: description,
        averageRating: averageRating(survey_responses),
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
    formatedTheme: null,
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
          const formatedData = formatData(data.survey_result_detail)
          this.setState({
            loading: false,
            error: false,
            ...formatedData,
          })
        }
      })
      .catch(err => {
        console.log(err)
        console.log("in error")
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
            <div key={questionTheme}>
              <h2>{questionTheme}</h2>
              <Questions questions={formatedQuestions} />
            </div>
          ))}
        {loading && "yolo loading now"}
        {error && "could not get data from server please refresh moment later"}
      </div>
    )
  }
}

export default Survey
