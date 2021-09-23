import * as m from "mithril";
import { Campaign, Issue } from "../../models"
import { BaseComponent, Link, elementAttrs } from "../base"
import ScrollHelper from "../helpers/ScrollHelper"
import ScrollDots from "../ScrollDots"
import Dialog from "../Dialog"
import CampaignStatement from "./CampaignStatement"
import CampaignCustomStatement from "./CampaignCustomStatement"
import CampaignInterstitial, { showInterstitial } from "./CampaignInterstitial"

type Attrs = {
    campaign: Campaign
    issue: Issue
}

export default function (): BaseComponent<Attrs> {

    const scrollHelper = ScrollHelper()

    function isLinkDisabled(issue: Issue, selectedIssueIndex: number) {
        return (issue.selectedStatement < 0 && !issue.customStatement) || selectedIssueIndex >= 2;
    }

    function navigateForward(issue: Issue, selectedIssueIndex: number) {
        if (isLinkDisabled(issue, selectedIssueIndex)) {
            return
        }

        showInterstitial(selectedIssueIndex, `issues?issue_page=${selectedIssueIndex+2}`)
    }

    function scrollToStatement(index: number) {
        const scrollX = scrollHelper.positionForIndex(index)
        scrollHelper.getElement().scrollTo({ left: scrollX })
    }

    function scrollToRandomStatement(issue: Issue) {
        const index = Math.floor(Math.random() * issue.statements.length)
        scrollToStatement(index)

        issue.selectStatement(issue.statements[index].id)
    }

    function scrollToCustomStatement(issue: Issue) {
        scrollToStatement(issue.statements.length)
    }

    return {
        ...elementAttrs,
        oncreate: (vnode) => {
            scrollHelper.initialize(document.getElementById("campaign_statements"))
            m.redraw()
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
                    <div className="campaign_actions">
                        <a className="campaign_action" onclick={() => scrollToRandomStatement(issue)}>Choose For Me</a>
                        <a className="campaign_action" onclick={() => scrollToCustomStatement(issue)}>Write My Own</a>
                    </div>
                    <div className="campaign_statements" id="campaign_statements" {...scrollHelper.attrs}>
                        {issue.statements.map(statement => <CampaignStatement issue={issue} statement={statement} />)}
                        <CampaignCustomStatement issue={issue} />
                        <div className="campaign_statement_buffer"></div>
                    </div>
                    <a className="campaign_source" data-a11y-dialog-show="source">source</a>
                    <ScrollDots index={scrollHelper.getIndex()} count={issue.statements.length + 1} shouldDisplay={scrollHelper.shouldDisplay()} />
                </div>
                <a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>
                <a 
                    className="campaign_button campaign_button-emphasized campaign_button-two"
                    disabled={isLinkDisabled(issue, selectedIssueIndex)} 
                    onclick={() => navigateForward(issue, selectedIssueIndex)}>
                        Next
                </a>
                <Dialog id="source">
                    <span>These statements were provided by the <strong>{campaign.organizer}</strong>.</span>
                </Dialog> 
                <CampaignInterstitial index={selectedIssueIndex} />
            </div>
            )
        }
    }
}
