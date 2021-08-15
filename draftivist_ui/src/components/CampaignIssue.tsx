import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"
import ScrollHelper from "./helpers/ScrollHelper"
import ScrollDots from "./ScrollDots"
import CampaignStatement from "./CampaignStatement"
import CampaignCustomStatement from "./CampaignCustomStatement"

type Attrs = {
    campaign: Campaign
    issue: Issue
}

export default function (): BaseComponent<Attrs> {

    const scrollHelper = ScrollHelper()

    function isLinkDisabled(issue: Issue, selectedIssueIndex: number) {
        return (issue.selectedStatement < 0 && !issue.customStatement) || selectedIssueIndex >= 2;
    }

    return {
        ...elementAttrs,
        oncreate: (vnode) => {
            scrollHelper.initialize(document.getElementById("campaign_statements"))
        },
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
                    <div className="campaign_statements" id="campaign_statements" {...scrollHelper.attrs}>
                        {issue.statements.map(statement => <CampaignStatement issue={issue} statement={statement} />)}
                        <CampaignCustomStatement issue={issue} />
                        <div className="campaign_statement_buffer"></div>
                    </div>
                    <ScrollDots index={scrollHelper.getIndex()} />
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
