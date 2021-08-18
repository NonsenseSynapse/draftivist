import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"
import CampaignStatement from "./CampaignStatement"
import CampaignCustomStatement from "./CampaignCustomStatement"

type Attrs = {
    campaign: Campaign
    issue: Issue
}

export default function (): BaseComponent<Attrs> {

    function saveCustomStatement(issue: Issue, customStatement: string) {
        issue.saveCustomStatement();
        return false
    }

    function onChangeHandler(e: Event, issue: Issue) {
        issue.customStatementDraft = (e.target as HTMLInputElement).value;
    }

    function isLinkDisabled(issue: Issue, selectedIssueIndex: number) {
        return (issue.selectedStatement < 0 && !issue.customStatement) || selectedIssueIndex >= 2;
    }

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { campaign, issue } = vnode.attrs
            const selectedIssueIndex = campaign.selectedIssues.indexOf(issue.id)

            return (
            <div className="campaign_content">
                <div className="campaign_content_main campaign_content_main-issue">
                    <div className="campaign_description">Select a statement to represent this issue:</div>
                    <div className="campaign_description_issue">
                        { issue.description }
                        <div className="campaign_description_issue_counter">
                            Issue { selectedIssueIndex+1 }
                        </div>
                    </div>
                    <div className="campaign_statements">
                        {issue.statements.map(statement => <CampaignStatement issue={issue} statement={statement} />)}
                        <CampaignCustomStatement issue={issue} />
                        <div className="campaign_statement_buffer"></div>
                    </div>
                </div>
                {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}
                <Link 
                    className="campaign_button campaign_button-emphasized campaign_button-two" 
                    disabled={isLinkDisabled(issue, selectedIssueIndex)} 
                    href={`/draft/issues?issue_page=${selectedIssueIndex+2}`}>
                        Next
                </Link>
            </div>
            )
        }
    }
}
