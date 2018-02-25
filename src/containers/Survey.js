import React, { Component } from "react"
import axios from "axios"
import Proptypes from "prop-types"

class Survey extends Component {
  static propTypes = {}
  state = {
    survey: [],
    loading: false,
    error: false,
  }

  componentDidMount() {
    const { match } = this.props
    const resourceUrl = "https://kevin-culture-amp-mock-api.herokuapp.com/"
    this.setState({ loading: true })
    axios
      .get(resourceUrl)
      .then(({ data }) => {
        if (data && data.survey_results) {
          this.setState({ loading: false, survey: data.survey_results })
        }
      })
      .catch(err => {
        this.setState({ error: true })
      })
  }

  render() {
    return <div className="SurveyCon">individual survey</div>
  }
}

export default Survey
