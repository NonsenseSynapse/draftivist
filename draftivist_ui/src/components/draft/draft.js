import React, {Component} from 'react';
import {apiBase} from '../../settings';

class Draft extends Component {
    constructor(props) {
        super(props);

        this.state = {
            draft: null,
            responseText: null
        }
    }

    
    getDraft(draftId) {
        fetch(`${apiBase}/draft/${draftId}`)
        .then(res => res.json())
        .then(data => {
            let responseText = data.selected_statements
                .map(selection => selection.statement.statement_text)
                .reduce((acc, currentValue) => `${acc} ${currentValue}`)
            this.setState({
                draft: data,
                responseText: responseText
            })
        })
      }
    
    componentDidMount() {
    const { id } = this.props.match.params
    this.getDraft(id)
    }

    copyToClipboard() {
        console.log('copying to clipboard!')
    }

    render() {
        if (!this.state.draft) {
            return <div />
        }
    
        return (
            <div>

                <h1>Your Draft</h1>               

                <div>
                    {this.state.draft.selected_statements.map((selected_statement) => (
                        <span key={selected_statement.statement.id} title={selected_statement.issue.prompt_text}>
                            {selected_statement.statement.statement_text}
                            &nbsp;
                        </span>
                    ))}
                </div>

            </div>

            
        )
    }

}

export default Draft