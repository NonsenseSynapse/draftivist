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
            <div>
                <h1>{campaign.title}</h1>
                <div>{campaign.description}</div>
                <p><Link href="/draft/issues">Get started</Link></p>
            </div>
            )
        }
    }
}