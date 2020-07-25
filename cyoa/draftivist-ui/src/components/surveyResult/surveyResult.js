import React, {Component} from 'react';
import {apiBase} from '../../settings';


class SurveyResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            surveyResponse: null
        }
    }

    
    getSurveyResponse(surveyResponseId) {
        fetch(`${apiBase}/survey_response/${surveyResponseId}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            surveyResponse: data
          })
        })
      }
    
      componentDidMount() {
        const { id } = this.props.match.params
        this.getSurveyResponse(id)
      }

    render() {
        if (!this.state.surveyResponse) {
            return <div />
        }
    
        return (
            <div>

                <h1>Your Draft</h1>               

                <div>
                    {this.state.surveyResponse.answers.map((answer) => (
                        <span key={answer.question_option.id} title={answer.question.question_text}>
                            {answer.question_option.description}
                            &nbsp;
                        </span>
                    ))}
                </div>

             

            </div>

            
        )
    }

}

export default SurveyResult