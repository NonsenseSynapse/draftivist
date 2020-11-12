import * as m from "mithril";
import { Campaign } from "../models"
import localData from "../data"

export default function() {

    let campaign: Campaign

    function selectIssue(id: number) {
        campaign.selectedIssues.add(id)
    }

    function deselectIssue(id: number) {
        campaign.selectedIssues.delete(id)
    }

    return {
        oninit: () => {
            campaign = Campaign.parse(localData)
        },
        view: () =>
            <div>
                <h1>{campaign.title}</h1>
                <div>{campaign.description}</div>
                <div>
                    <p>Select two issues to focus on:</p>
                    <ul>
                    {campaign.issues.map(issue => 
                        campaign.selectedIssues.has(issue.id) ? 
                        <li onclick={deselectIssue.bind(this, issue.id)}>
                            <b>{issue.description}</b>
                        </li> :
                        <li onclick={selectIssue.bind(this, issue.id)}>
                            {issue.description}
                        </li>
                    )}
                    </ul>
                </div>
            </div>
    }
}