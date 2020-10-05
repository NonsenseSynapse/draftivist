import React, {Component} from 'react';
import Issue from '../issue/issue';
import {apiBase} from '../../settings';

class Campaign extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campaign: null,
            isComplete: false,
            isInvalidId: false,
            selectedStatements: {},
            numIssues: null,
            currentPage: 0,
            pagesCompleted: 0
        }
    }
    
    getCampaign(campaignId) {
        fetch(`${apiBase}/campaigns/${campaignId}/`)
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

            let numIssues = data != null ? data.issues.length : 0
            this.setState({
                campaign: data,
                numIssues: numIssues   
            })
        })
      }
    
      componentDidMount() {
        const { id } = this.props.match.params
        this.getCampaign(id)
      }

    checkComplete() {
        let pagesCompleted = Object.keys(this.state.selectedStatements).length
        this.setState({
            isComplete: this.state.numIssues === pagesCompleted,
            pagesCompleted: pagesCompleted
        })
      }

    selectStatement = (issueId, statementId) => {
        this.setState(prevState => ({
            selectedStatements: {
                ...prevState.selectedStatements,
                [issueId]: statementId
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

    submitDraft = () => {
        let payload = {selections: []};
        for (let issueId in this.state.selectedStatements) {
            payload['selections'].push({
                issue: parseInt(issueId),
                statement: parseInt(this.state.selectedStatements[issueId])
            })
        }
        
        fetch(apiBase + `/campaigns/${this.state.campaign.id}/submit/`, {
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
                No Campaign matching that ID :(
            </div>
        }
        
        if (!this.state.campaign) {
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
                    disabled={this.state.pagesCompleted <= this.state.currentPage || this.state.currentPage === this.state.numIssues - 1}
                    className="btn btn-primary"
                    onClick={this.nextButton}>
                        Next
                </button>

                <h1>{this.state.campaign.name}</h1>

                {this.state.campaign.issues.map((issue, index) => (
                    <Issue
                        key={issue.id}
                        showIssue={index === this.state.currentPage} 
                        issue={issue} 
                        selectStatement={this.selectStatement} 
                    />
                ))}

                {this.state.isComplete ? <button className={"btn btn-primary"} onClick={this.submitDraft}>Create Draft!</button> : <div></div>}

            </div>

            
        )
    }

}

export default Campaign