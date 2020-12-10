import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
    campaign: Campaign
    issue: Issue
}

export default function (): BaseComponent<Attrs> {

    function selectStatement(issue: Issue, id: number) {
        issue.selectStatement(id)
    }

    function saveCustomStatement(issue: Issue, customStatement: string) {
        issue.saveCustomStatement(customStatement);
    }

    let customStatementValue = '';

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { campaign, issue } = vnode.attrs
            const selectedIssueIndex = campaign.selectedIssues.indexOf(issue.id)
            console.log("customStatementValue", customStatementValue)

            return (
                <div>
                    <h2>{issue.description}</h2>
                    <h3>Select a statement for this issue:</h3>
                    {issue.statements.map(statement =>
                        <li onclick={selectStatement.bind(this, issue, statement.id)}>
                            {issue.isSelected(statement.id) ?
                                <b>{statement.description}</b> :
                                <span>{statement.description}</span>
                            }
                        </li>
                    )}
                    <p>
                    <h3>Or write your own statement:</h3>
                    <form onSubmit={(e: KeyboardEvent)=> {e.preventDefault(); saveCustomStatement.bind(this, issue, customStatementValue)}}>
                        <input type='text' value={this.customStatementValue} oninput={(e: Event) =>
                        // @ts-ignore
                            {customStatementValue = e.target.value}}/>
                        <button type='submit' />
                    </form>
                        {selectedIssueIndex < campaign.selectedIssues.length - 1 ?
                            <Link disabled={issue.selectedStatement < 0} href={`/draft/issue?id=${campaign.selectedIssues[selectedIssueIndex + 1]}`}>Next issue</Link> :
                            <Link disabled={issue.selectedStatement < 0} href="/draft/intro">Next</Link>
                        }
                    </p>
                </div>
            )
        }
    }
}
