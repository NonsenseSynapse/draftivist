import * as m from "mithril";
import { Campaign } from "../models"
import localData from "../data"

import CampaignIssueSelection from "./CampaignIssueSelection";
import CampaignLanding from "./CampaignLanding";
import CampaignIssue from "./CampaignIssue";

import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
    page: string
    id?: string // issue id specified in query string, optional
}

export default function() : BaseComponent<Attrs> {

    let campaign: Campaign

    return {
        ...elementAttrs,
        oninit: (vnode) => {
            campaign = Campaign.parse(localData)
        },
        view: (vnode) =>{
            const { page, id } = vnode.attrs
            return (
                <div>
                    { page != "landing" && <Link href="/draft/landing">Back to start</Link>}
                    
                    { page == "landing" && <CampaignLanding campaign={campaign} /> }
                    { page == "issues" && <CampaignIssueSelection campaign={campaign} /> }
                    { page == "issue" && id && <CampaignIssue campaign={campaign} issue={campaign.getIssue(+id)} /> }
                </div>
            )
        }
    }
}