import React, { Component } from "react"
import axios from "axios"
import Proptypes from "prop-types"
import Questions from "./Questions"

class Survey extends Component {
  static propTypes = {
    match: Proptypes.object.isRequired,
    baseResourceUrl: Proptypes.string.isRequired,
  }

  state = {
    survey: {},
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
          this.setState({
            loading: false,
            survey: data.survey_result_detail,
            error: false,
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
    const { survey, loading, error } = this.state
    const { name, participant_count, response_rate, submitted_response_count, themes } = survey
    return (
      <div className="SurveyCon">
        {Object.keys(survey).length > 0 && (
          <div>
            {name}
            <br />
            {participant_count}
            <br />
            {response_rate}
            <br />
            {submitted_response_count}
          </div>
        )}
        {themes &&
          themes.map(({ name, questions }) => {
            return (
              <div>
                <h2>{name}</h2>
                <Questions questions={questions} />
              </div>
            )
          })}
        {loading && "yolo loading now"}
        {error && "could not get data from server please refresh moment later"}
      </div>
    )
  }
}

export default Survey
