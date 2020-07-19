import React, {Component} from 'react'
import './surveyQuestion.css';

class SurveyQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.surveyQuestion.id,
            showQuestion: props.showQuestion
        }
    }
    
    selectOption(optionId){
        this.props.selectQuestionOption(this.state.id, optionId);
    }
    
    render() {
        if (!this.props.surveyQuestion) {
            return <div />
        }
    
        return (
            <div className={`question-wrapper ${this.props.showQuestion ? "active" : "inactive"}`}>
                <h2>{this.props.surveyQuestion.question_text}</h2>
                {this.props.surveyQuestion.options.map((questionOption) => (

                    <div key={questionOption.id}>
                        <button class='survey-question-option btn btn-secondary' 
                                onClick={() => this.selectOption(questionOption.id)}>
                                    {questionOption.description} 
                        </button>
                    </div>
        
                ))}
            </div>
        )
    }
}
export default SurveyQuestion