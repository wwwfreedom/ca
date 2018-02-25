import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import SurveysList from "./SurveysList"
import Survey from "./Survey"
import Wrapper from "../components/Wrapper"

// constants
const baseResourceUrl = "https://kevin-culture-amp-mock-api.herokuapp.com"

class App extends Component {
  render() {
    return (
      <Router>
        <Wrapper>
          <Route
            exact
            path="/"
            render={routeProps => <SurveysList {...routeProps} baseResourceUrl={baseResourceUrl} />}
          />
          <Route
            path="/survey_results/:id"
            render={routeProps => <Survey {...routeProps} baseResourceUrl={baseResourceUrl} />}
          />
        </Wrapper>
      </Router>
    )
  }
}

export default App
