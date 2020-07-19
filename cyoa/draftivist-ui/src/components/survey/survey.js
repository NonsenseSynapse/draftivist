import React, {Component} from 'react';
import SurveyQuestion from '../surveyQuestion/surveyQuestion';
import {apiBase} from '../../settings';

class Survey extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survey: null,
            isComplete: false,
            selectedOptions: {},
            numQuestions: null
        }
    }
    
    getSurvey() {
        fetch(apiBase + '/surveys/1')
        .then(res => res.json())
        .then(data => {
          this.setState({
              survey: data,
              numQuestions: data.questions.length    
          })
        })
      }
    
      componentDidMount() {
        this.getSurvey()
      }

    checkComplete() {
        this.setState({
            isComplete: this.state.numQuestions === Object.keys(this.state.selectedOptions).length
        })
      }

    selectQuestionOption = (questionId, questionOptionId) => {
        this.setState(prevState => ({
            selectedOptions: {
                ...prevState.selectedOptions,
                [questionId]: questionOptionId
            }
        }),
        this.checkComplete
        )

        
    }

    render() {
        if (!this.state.survey) {
            return <div />
        }
    
        return (
            <div>

                <h1>{this.state.survey.name}</h1>

                {this.state.survey.questions.map((question) => (
                    <SurveyQuestion
                        key={question.id} 
                        surveyQuestion={question} 
                        selectQuestionOption={this.selectQuestionOption} 
                    />
                ))}

                {this.state.isComplete ? <div>Survey complete!</div> : <div></div>}

            </div>

            
        )
    }

}

export default Survey