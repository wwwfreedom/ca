import React, { Component } from "react"
import axios from "axios"
import Proptypes from "prop-types"
import { Link } from "react-router-dom"

class SurveysList extends Component {
  static propTypes = {
    baseResourceUrl: Proptypes.string.isRequired,
  }

  state = {
    surveys: [],
    loading: false,
    error: false,
  }

  componentDidMount() {
    const { baseResourceUrl } = this.props
    this.setState({ loading: true })
    axios
      .get(baseResourceUrl)
      .then(({ data }) => {
        if (data && data.survey_results) {
          this.setState({ loading: false, surveys: data.survey_results })
        }
      })
      .catch(() => {
        this.setState({ error: true, loading: false })
      })
  }

  render() {
    const { surveys, loading, error } = this.state
    return (
      <div className="SurveysListCon">
        {surveys.map(survey => {
          // regex to strip string of filetypes
          const url = survey.url.replace(/\.[^/.]+$/, "")
          return (
            <div key={survey.name}>
              <Link to={url}>{survey.name}</Link>
              <br />
            </div>
          )
        })}
        {loading && "loading now"}
        {error && "could not get data from server please refresh moment later"}
      </div>
    )
  }
}

export default SurveysList
