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
        return (issue.selectedStatement < 0 && !issue.customStatement) || (selectedIssueIndex > 2);
    }
    let link: string;
    function generateLink(issue: Issue, selectedIssueIndex: number) {
        console.log("in generate link", selectedIssueIndex)
        if (selectedIssueIndex = 2) {
            console.log('in intro link')
            link = `/draft/intro`
        }
        link = `/draft/issues?issue_page=${selectedIssueIndex + 2}`
        console.log("in normal", link)
    }

    return {
        ...elementAttrs,
        view: (vnode) => {
            console.log("does view re-render")
            const { campaign, issue } = vnode.attrs
            const selectedIssueIndex = campaign.selectedIssues.indexOf(issue.id)
            console.log("in issue", "selectedIssueIndex:", selectedIssueIndex, "campaign:", campaign)
            generateLink(issue, selectedIssueIndex)

            return (
                <div className="campaign_content">
                    <div className="campaign_content_main campaign_content_main-issue">
                        <div className="campaign_description">Select a statement to represent this issue:</div>
                        <div className="campaign_description_issue">
                            {issue.description}
                            <div className="campaign_description_issue_counter">
                                Issue {selectedIssueIndex + 1}
                            </div>
                        </div>
                        <div className="campaign_statements">
                            {issue.statements.map(statement => <CampaignStatement issue={issue} statement={statement} />)}
                            <CampaignCustomStatement issue={issue} />
                            <div className="campaign_statement_buffer"></div>
                        </div>
                    </div>
                    {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}
                    {(selectedIssueIndex >= 2) ? (
                        <Link
                            className="campaign_button campaign_button-emphasized campaign_button-two"
                            disabled={isLinkDisabled(issue, selectedIssueIndex)}
                            href={`/draft/intro`}>
                            Next
                        </Link>
                    ) : (


                        <Link
                            className="campaign_button campaign_button-emphasized campaign_button-two"
                            disabled={isLinkDisabled(issue, selectedIssueIndex)}
                            href={`/draft/issues?issue_page=${selectedIssueIndex + 2}`}>
                            Next
                        </Link>
                    )}
                </div>
            )
        }
    }
}


