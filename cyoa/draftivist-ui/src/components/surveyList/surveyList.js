import React, {Component} from 'react';
import SurveyQuestion from '../surveyQuestion/surveyQuestion';
import {apiBase} from '../../settings';
import {Link} from 'react-router-dom';


class Survey extends Component {
    constructor(props) {
        super(props);

        this.state = {
            surveyList: null
        }
    }
    
    getSurveys() {
        fetch(apiBase + '/surveys')
        .then(res => res.json())
        .then(data => {
          this.setState({
            surveyList: data.results
          })
        })
      }
    
      componentDidMount() {
        this.getSurveys()
      }

    render() {
        if (!this.state.surveyList) {
            return <div />
        }
    
        return (
            <div>

                <h1>Available Surveys</h1>

                {this.state.surveyList.map((survey) => (
                    <Link to={`/surveys/${survey.id}`}>{survey.name}</Link>
                ))}

            </div>

            
        )
    }

}

export default Survey