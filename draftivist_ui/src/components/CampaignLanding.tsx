import * as m from "mithril";
import { Campaign } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
    campaign: Campaign
}

export default function() : BaseComponent<Attrs> {

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { campaign } = vnode.attrs
            return [
            <div className="campaign_hero">
                <h1 className="campaign_title">{campaign.title}</h1>
            </div>,
            <div className="campaign_content">
                <div className="campaign_description">{campaign.description}</div>
                <Link className="campaign_button" href="/draft/issues">Get started</Link>
            </div>
            ]
        }
    }
}