import React, {Component} from 'react'
import SurveyQuestionOption from '../surveyQuestionOption/surveyQuestionOption';

class SurveyQuestion extends Component {
    selectOption(optionText){
        
    }
    
    render() {
        if (!this.props.surveyQuestion) {
            return <div />
        }
    
        return (
            <div>
            <h2>{this.props.surveyQuestion.question_text}</h2>
            {this.props.surveyQuestion.options.map((questionOption) => (
                <SurveyQuestionOption surveyQuestionOption={questionOption} selectQuestionOption={this.selectQuestionOption} />
    
            ))}
            </div>
        )
    }
}
export default SurveyQuestion