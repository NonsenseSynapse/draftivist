import React, {Component} from 'react';
import SurveyQuestion from '../surveyQuestion/surveyQuestion';
import {apiBase} from '../../settings';

class Survey extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survey: null,
            isComplete: false,
            isInvalidId: false,
            selectedOptions: {},
            numQuestions: null,
            currentPage: 0,
            pagesCompleted: 0
        }
    }
    
    getSurvey(surveyId) {
        fetch(`${apiBase}/surveys/${surveyId}/`)
        .then(res => {
            if (res.status >= 400) {
                this.setState({
                    isInvalidId: true
                })
            }
            return res.json()
        })
        .then(data => {
            if (this.state.isInvalidId) {
                return null;
            }

            let numQuestions = data != null ? data.questions.length : 0
            this.setState({
                survey: data,
                numQuestions: numQuestions   
            })
        })
      }
    
      componentDidMount() {
        const { id } = this.props.match.params
        this.getSurvey(id)
      }

    checkComplete() {
        let pagesCompleted = Object.keys(this.state.selectedOptions).length
        this.setState({
            isComplete: this.state.numQuestions === pagesCompleted,
            pagesCompleted: pagesCompleted
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

    backButton = () => {
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    }

    nextButton = () => {
        this.setState({
            currentPage: this.state.currentPage + 1
        })
    }

    submitAnswers = () => {
        console.log(this.state.selectedOptions);
        let payload = {answers: []};
        for (let question_id in this.state.selectedOptions) {
            payload['answers'].push({
                question: parseInt(question_id),
                question_option: parseInt(this.state.selectedOptions[question_id])
            })
        }
        
        fetch(apiBase + `/surveys/${this.state.survey.id}/submit/`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(payload),
            method: "POST"
        })
        .then(res => res.json())
        .then(data => {
            this.props.history.push(`/draft/${data.id}`)
        })
    }

    render() {
        if (this.state.isInvalidId) {
            return <div>
                No Survey matching that ID :(
            </div>
        }
        
        if (!this.state.survey) {
            return <div />
        }
    
        return (
            <div>

                <button 
                    disabled={this.state.currentPage === 0}
                    className="btn btn-primary"
                    onClick={this.backButton}>
                        Back
                </button>

                <button
                    disabled={this.state.pagesCompleted <= this.state.currentPage || this.state.currentPage === this.state.numQuestions - 1}
                    className="btn btn-primary"
                    onClick={this.nextButton}>
                        Next
                </button>

                <h1>{this.state.survey.name}</h1>

                {this.state.survey.questions.map((question, index) => (
                    <SurveyQuestion
                        key={question.id}
                        showQuestion={index === this.state.currentPage} 
                        surveyQuestion={question} 
                        selectQuestionOption={this.selectQuestionOption} 
                    />
                ))}

                {this.state.isComplete ? <button className={"btn btn-primary"} onClick={this.submitAnswers}>Survey complete!</button> : <div></div>}

            </div>

            
        )
    }

}

export default Survey