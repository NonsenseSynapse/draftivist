import * as m from "mithril";
import { Campaign } from "../models"
import { elementAttrs, BaseComponent, Link } from "./base"

type Attrs = {
    campaign: Campaign
}

export default function() : BaseComponent<Attrs> {

    let campaign: Campaign

    function selectIssue(id: number) {
        campaign.selectIssue(id)
    }

    function deselectIssue(id: number) {
        campaign.deselectIssue(id)
    }

    return {
        ...elementAttrs,
        oninit: (vnode) => {
            campaign = vnode.attrs.campaign
        },
        view: () => 
            <div>
                <p>Select two issues to focus on:</p>
                <ul>
                {campaign.issues.map(issue => 
                    campaign.isSelected(issue.id) ? 
                    <li onclick={deselectIssue.bind(this, issue.id)}>
                        <b>{issue.description}</b>
                    </li> :
                    <li onclick={selectIssue.bind(this, issue.id)}>
                        {issue.description}
                    </li>
                )}
                </ul>
                <Link href="/draft/1">Next page</Link>
            </div>
    }
    
}