import React, { Component } from "react"
import axios from "axios"
import Proptypes from "prop-types"

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
          this.setState({ loading: false, survey: data.survey_result_detail, error: false })
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
    return (
      <div className="SurveyCon">
        {loading && "loading now"}
        {error && "could not get data from server please refresh moment later"}
      </div>
    )
  }
}

export default Survey
