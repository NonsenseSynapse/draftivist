import * as m from "mithril";
import { Campaign } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
    campaign: Campaign
}

export default function() : BaseComponent<Attrs> {

    let campaign: Campaign

    return {
        ...elementAttrs,
        oninit: (vnode) => {
            campaign = vnode.attrs.campaign
        },
        view: () =>
            <div>
                <h1>{campaign.title}</h1>
                <div>{campaign.description}</div>
                <p><Link href="/draft/issues">Get started</Link></p>
            </div>
    }
}