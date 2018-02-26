import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Proptypes from 'prop-types'
import Spinner from '../components/Spinner'
import Card from '../components/Card'

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
                <h1>Surveys</h1>
                {surveys.map(({ name, url, participant_count: participantCount }) => {
                    // regex to strip url string of filetypes
                    const stripedUrl = url.replace(/\.[^/.]+$/, '')
                    return (
                        <Card key={name} level={1}>
                            <h3>{name}</h3>
                            <p>{participantCount}</p>
                            <br />
                            <Link to={stripedUrl}>view survey</Link>
                        </Card>
                    )
                })}
                {loading && <Spinner />}
                {error && 'could not get data from server please refresh moment later'}
            </div>
        )
    }
}

export default SurveysList
