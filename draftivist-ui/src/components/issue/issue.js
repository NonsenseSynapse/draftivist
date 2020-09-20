import React, {Component} from 'react'
import './issue.css';

class Issue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.issue.id,
            showIssue: props.showIssue,
            selectedStatement: null
        }
    }
    
    selectStatement(statementId){
        this.setState({
            selectedStatement: statementId
        })
        this.props.selectStatement(this.state.id, statementId);
    }
    
    render() {
        if (!this.props.issue) {
            return <div />
        }
    
        return (
            <div className={`issue-wrapper ${this.props.showIssue ? "active" : "inactive"}`}>
                <h2>{this.props.issue.prompt_text}</h2>
                {this.props.issue.statements.map((statement) => (

                    <div key={statement.id}>
                        <button className={`statement btn btn-secondary 
                                            ${this.state.selectedStatement === statement.id ? "btn-success" : "btn-secondary"}`} 
                                onClick={() => this.selectStatement(statement.id)}>
                                    {statement.statement_text} 
                        </button>
                    </div>
        
                ))}
            </div>
        )
    }
}
export default Issue