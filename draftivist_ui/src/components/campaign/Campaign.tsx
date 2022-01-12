import * as m from "mithril";
import { Campaign } from "../../models"

import CampaignIssueSelection from "./CampaignIssueSelection";
import CampaignLanding from "./CampaignLanding";
import CampaignIssue from "./CampaignIssue";

import { BaseComponent, elementAttrs } from "../base"
import CampaignSendEmail from "./CampaignSendEmail";
import CampaignGetInvolved from "./CampaignGetInvolved";

type Attrs = {
    page: string
    id?: string // issue id specified in query string, optional
    issue_page?: string
}

export default function() : BaseComponent<Attrs> {

    let campaign: Campaign = new Campaign(0, "", "")

    // Quick and dirty way to update the progress bar when 
    // navigating to a new page. If adding more pages to the
    // campaign flow, make sure to both add the page name to
    // the switch block and increment the totalPages var
    function getTranslateX(page: string, issue_page?: string): string {
        let pageOrder = 0;
        const totalPages = 8;
        switch (page) {
            case "landing": pageOrder = 0; break;
            case "issues": 
                switch (issue_page) {
                    case "1": pageOrder = 1; break;
                    case "2": pageOrder = 3; break;
                    case "3": pageOrder = 5; break;
                }
                break;
            case "issue": 
                switch (issue_page) {
                    case "1": pageOrder = 2; break;
                    case "2": pageOrder = 4; break;
                    case "3": pageOrder = 6; break;
                }
                break;
            case "send-email": pageOrder = 7; break;
            case "get-involved": pageOrder = 8; break;
        }
        return `-${(1-pageOrder/totalPages)*100}%`
    }

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
                    { page != "landing" && // messes with landing page styling
                        <div className="campaign_progress" style={{transform: `translateX(${getTranslateX(page, issue_page)})`}}/>  
                    }                 
                    { page == "landing" && <CampaignLanding campaign={campaign} /> }
                    { page == "issues" && <CampaignIssueSelection campaign={campaign} pageIndex={+issue_page-1} /> }
                    { page == "issue" && id && <CampaignIssue campaign={campaign} issue={campaign.getIssue(+id)} /> }
                    { page == "send-email" && <CampaignSendEmail campaign={campaign} /> }
                    { page == "get-involved" && <CampaignGetInvolved />}
                </div>
            )
        }
    }
}
