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
            const { title, description } = vnode.attrs.campaign
            return (
            <div className="campaign_content">
                <div className="campaign_hero">
                    <h1 className="campaign_title">{title}</h1>
                </div>
                <div className="campaign_content_main">
                    <div className="campaign_description">{description}</div>
                    <div className="campaign_description"><strong>Reach out to your elected officials today.</strong></div>
                </div>
                <Link className="campaign_button campaign_button-emphasized" href="/draft/issues?issue_page=1">Draft Your Email</Link>
            </div>
            )
        }
    }
}