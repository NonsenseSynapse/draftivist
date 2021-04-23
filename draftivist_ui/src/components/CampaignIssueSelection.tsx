import * as m from "mithril";
import { Campaign } from "../models"
import { elementAttrs, BaseComponent, Link } from "./base"

type Attrs = {
    campaign: Campaign
}

export default function() : BaseComponent<Attrs> {

    function selectIssue(campaign: Campaign, id: number) {
        campaign.selectIssue(id);
    }

    function deselectIssue(campaign: Campaign, id: number) {
        campaign.deselectIssue(id)
    }

    return {
        ...elementAttrs,
        view: (vnode) => {
            const {campaign} = vnode.attrs;
            return (
            <div>
                <h3>Select two issues to focus on:</h3>
                <ul>
                {campaign.issues && campaign.issues.map(issue =>
                    campaign.isSelected(issue.id) ?
                    <li onclick={deselectIssue.bind(this, campaign, issue.id)}>
                        <b>{issue.description}</b>
                    </li> :
                    <li onclick={selectIssue.bind(this, campaign, issue.id)}>
                        {issue.description}
                    </li>
                )}
                </ul>
                <p><Link disabled={campaign.selectedIssues.length != 2} href={`/draft/issue?id=${campaign.selectedIssues[0]}`}>Next page</Link></p>
            </div>

            );
        }
    }

}
