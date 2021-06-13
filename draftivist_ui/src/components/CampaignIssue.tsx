import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"
import CampaignIssueSelection from "./CampaignIssueSelection";

type Attrs = {
    campaign: Campaign
    issue: Issue
}

export default function (): BaseComponent<Attrs> {

    function selectStatement(issue: Issue, id: number) {
        issue.selectStatement(id)
    }

    function saveCustomStatement(issue: Issue, customStatement: string) {
        issue.saveCustomStatement();
        return false
    }

    function isLinkDisabled(issue: Issue) {
        return Boolean(issue.selectedStatement < 0 && !issue.customStatement)
    }

    function onChangeHandler(e: Event, issue: Issue) {
        issue.customStatementDraft = (e.target as HTMLInputElement).value;
    }

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { campaign, issue } = vnode.attrs
            const selectedIssueIndex = campaign.selectedIssues.indexOf(issue.id)

            return (
            <div className="campaign_content">
                <div className="campaign_description">Select a statement to represent this issue:</div>
                <div className="campaign_description_issue">
                    { issue.description }
                    <div className="campaign_description_issue_counter">
                        Issue { selectedIssueIndex+1 }
                    </div>
                </div>
                <ul className="campaign_issues" /* temporary: will be replaced with carousel */>
                {issue.statements.map(statement => {
                    const selectedClass = issue.isSelected(statement.id) ? " selected" : ""
                    return (          
                    <li className={`campaign_issue${selectedClass}`}  onclick={selectStatement.bind(this, issue, statement.id)}>
                        {statement.description}
                    </li>
                    )
                }
                       
                )}
                </ul>
                <div className="campaign_description">Or draft your own statement:</div>
                {
                    issue.customStatement ? (
                        <div>{issue.customStatement}</div>
                    ) : (
                        <form className="campaign_custom_draft" onsubmit={saveCustomStatement.bind(this, issue)}>
                            <input type='text' value={issue.customStatementDraft} oninput={(e: Event) => onChangeHandler(e, issue)} />
                            <button type='submit'>Save Statement</button>
                        </form>
                    )
                }
                {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}
                <Link 
                    className="campaign_button campaign_button-emphasized campaign_button-two" 
                    disabled={isLinkDisabled(issue) || selectedIssueIndex >= 2} 
                    href={`/draft/issues?issue_page=${selectedIssueIndex+2}`}>
                        Next
                </Link>
            </div>
            )
        }
    }
}
