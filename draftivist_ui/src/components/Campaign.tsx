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

    let campaign: Campaign = new Campaign(0, "", "")

    return {
        ...elementAttrs,
        oninit: (vnode) => {
            Campaign.load(1).then(c => {
                campaign = c
                m.redraw()
            })
        },
        view: (vnode) =>{
            const { page, id } = vnode.attrs
            // if the campaign hasn't loaded, render loading state
            if (!campaign.issues) {
                // add loading state
                return null;
            }
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
