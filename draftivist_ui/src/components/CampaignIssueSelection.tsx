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
                <h3>Select two issues to focus on:</h3>
                <ul>
                {campaign.issues.map(issue =>
                    Array.isArray(campaign.selectedIssues) &&
                    campaign.selectedIssues.includes(issue.id) ?
                    <li onclick={deselectIssue.bind(this, issue.id)}>
                        <b>{issue.description}</b>
                    </li> :
                    <li onclick={selectIssue.bind(this, issue.id)}>
                        {issue.description}
                    </li>
                )}
                </ul>
                {
                    campaign.selectedIssues.length > 0 &&
                <Link href="/draft/1">Next page</Link>
                }
            </div>
    }

}
