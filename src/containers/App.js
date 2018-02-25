import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import SurveysList from "./SurveysList"
import Survey from "./Survey"
import Wrapper from "../components/Wrapper"

class App extends Component {
  render() {
    return (
      <Router>
        <Wrapper>
          <Route exact path="/" component={SurveysList} />
          <Route exact path="/survey/:id" component={Survey} />
        </Wrapper>
      </Router>
    )
  }
}

export default App
