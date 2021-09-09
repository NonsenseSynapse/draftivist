import * as m from "mithril";
import { Campaign } from "../models"

import CampaignIssueSelection from "./CampaignIssueSelection";
import CampaignLanding from "./CampaignLanding";
import CampaignIssue from "./CampaignIssue";
import DraftIntro from "./DraftIntro";
import DraftClosing from "./DraftClosing";
import DraftSubjectLine from "./DraftSubjectLine";

import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
    page: string
    id?: string // issue id specified in query string, optional
    issue_page?: string
}

export default function() : BaseComponent<Attrs> {

    let campaign: Campaign = new Campaign(0, "", "")

    return {
        ...elementAttrs,
        oninit: (vnode) => {
            Campaign.load(1).then(c => {
                campaign = c
                m.redraw()
            })
        },
        view: (vnode) => {
            // if the campaign hasn't loaded, render loading state
            if (!campaign.issues) {
                // add loading state
                return null;
            }

            const { page, id, issue_page } = vnode.attrs
            return (
                <div className="campaign_content-wrapper">
                    { page == "landing" && <CampaignLanding campaign={campaign} /> }
                    { page == "issues" && <CampaignIssueSelection campaign={campaign} pageIndex={+issue_page-1} /> }
                    { page == "issue" && id && <CampaignIssue campaign={campaign} issue={campaign.getIssue(+id)} /> }
                    <div>
                    { page == 'intro' && <DraftIntro campaign={campaign}/>}
                    { page == 'conclusion' && <DraftClosing campaign={campaign}/>}
                    { page == 'subject-line' && <DraftSubjectLine campaign={campaign}/>}
                    {/* { page == 'review' && <FinishCampaignDraft />}
                    { page == 'stay-involved' && <FinishCampaignDraft />}
                    { page == 'send-email' && <FinishCampaignDraft />}
                    { page == 'more-info' && <FinishCampaignDraft />} */}
                    {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}
        <Link
            className="campaign_button campaign_button-emphasized campaign_button-two"
            href={`/draft/issues?`}>
                Next
        </Link>
                    </div>
                </div>
            )
        }
    }
}
