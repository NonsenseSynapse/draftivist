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
            return (
            <div className="content">
                <div className="heroImage">
                    <h1>{campaign.title}</h1>
                </div>
                <div className="description">{campaign.description}</div>
                <Link className="button" href="/draft/issues">Get started</Link>
            </div>
            )
        }
    }
}