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
                {/*issue.statements.map(statement => 
                    <li onclick={selectStatement.bind(this, issue, statement.id)}>
                        { issue.isSelected(statement.id) ? 
                            <b>{statement.description}</b> : 
                            <span>{statement.description}</span>
                        }
                    </li>    
                    )*/}
                <h3>Or draft your own statement:</h3>
                    {
                        issue.customStatement ? (
                            <div>{issue.customStatement}</div>
                        ) : (
                            <form onsubmit={saveCustomStatement.bind(this, issue)}>
                                <input type='text' value={issue.customStatementDraft} oninput={(e: Event) => onChangeHandler(e, issue)} />
                                <button type='submit'>Save Statement</button>
                            </form>
                        )
                    }
                {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}
                <Link className="campaign_button campaign_button-emphasized campaign_button-two" disabled={issue.selectedStatement < 0} href={''}>Next</Link>
            </div>
            )
        }
    }
}
