import React, {Component} from 'react';
import SurveyQuestion from '../surveyQuestion/surveyQuestion';

class Survey extends Component {
    state = {
        isComplete: false,
        selectedOptions: {}
      }

        checkComplete() {
          this.isComplete = this.props.survey.questions.length === Object.keys(this.state.selectedOptions).length
      }

    selectQuestionOption(questionId, questionOption) {
        this.selectedOptions[questionId] = questionOption;
    }

    render() {
        if (!this.props.survey) {
            return <div />
        }
    
        return (
            <div>
            <center><h1>{this.props.survey.name}</h1></center>
            {this.props.survey.questions.map((question) => (
                <SurveyQuestion surveyQuestion={question} selectQuestionOption={this.selectQuestionOption} />
            ))}
            </div>
        )
    }

}

export default Survey