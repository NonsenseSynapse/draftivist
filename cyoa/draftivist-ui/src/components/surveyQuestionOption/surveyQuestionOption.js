import React, {Component} from 'react'
import './surveyQuestionOption.css';

class SurveyQuestionOption extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.description
        }
    }
    
    selectOption = () => {
        console.log(this);
        console.log(this.state.description);
    }
    
    render() {
        if (!this.props.surveyQuestionOption) {
            return <div />
        }
    
        return (
            <div>
                <button class='survey-question-option btn btn-secondary' 
                        onClick={this.selectOption}>{this.props.surveyQuestionOption.description} </button>
            </div>
        )
    }
};


export default SurveyQuestionOption