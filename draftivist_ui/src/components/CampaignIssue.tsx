import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
    campaign: Campaign
    issue: Issue
}

export default function() : BaseComponent<Attrs> {

    function selectStatement(issue: Issue, id: number) {
        issue.selectStatement(id)
    }

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { campaign, issue } = vnode.attrs
            const selectedIssueIndex = campaign.selectedIssues.indexOf(issue.id)

            return (
            <div>
                <h2>{issue.description}</h2>
                <h3>Select a statement for this issue:</h3>
                {issue.statements.map(statement => 
                    <li onclick={selectStatement.bind(this, issue, statement.id)}>
                        { issue.isSelected(statement.id) ? 
                            <b>{statement.description}</b> : 
                            <span>{statement.description}</span>
                        }
                    </li>    
                )}
                <p>
                { selectedIssueIndex < campaign.selectedIssues.length-1 ?
                    <Link disabled={issue.selectedStatement < 0} href={`/draft/issue?id=${campaign.selectedIssues[selectedIssueIndex+1]}`}>Next issue</Link> :
                    <Link disabled={issue.selectedStatement < 0} href="/draft/intro">Next</Link>
                }
                </p>
            </div>
            )
        }
    }
}