import * as m from "mithril";
import { Campaign } from "../models"
import localData from "../data"
import CampaignIntro from "./CampaignIntro";
import SelectIssueStatements from './SelectIssueStatements';
import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
    index: number
}

export default function() : BaseComponent<Attrs> {

    let campaign: Campaign

    return {
        ...elementAttrs,
        oninit: () => {
            campaign = Campaign.parse(localData)
            console.log(campaign)
        },
        view: (vnode) =>
            <div>
                <h1>{campaign.title}</h1>
                <div>{campaign.description}</div>
                { vnode.attrs.index == 0 && <CampaignIntro campaign={campaign} /> }
                {
                    vnode.attrs.index === 1 && <SelectIssueStatements />
                }
                { vnode.attrs.index == 1 && <Link href="/draft/0">Go back</Link>}
            </div>
    }
}
