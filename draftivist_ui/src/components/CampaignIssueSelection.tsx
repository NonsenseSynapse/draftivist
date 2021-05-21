import * as m from "mithril";
import { Campaign } from "../models"
import { elementAttrs, BaseComponent, Link } from "./base"

type Attrs = {
    campaign: Campaign
    issuePage: number
}

const page_to_ordinal = ["", "first", "second", "third"]

// todo: update logic to select one at a time

export default function() : BaseComponent<Attrs> {

    function selectIssue(campaign: Campaign, id: number) {
        campaign.selectIssue(id)
    }

    function deselectIssue(campaign: Campaign, id: number) {
        campaign.deselectIssue(id)
    }

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { campaign, issuePage } = vnode.attrs
            return (
            <div className="campaign_content">
                <h3 className="campaign_description">Select your {page_to_ordinal[issuePage]} issue to focus on:</h3>
                <ul className="campaign_issues">
                {campaign.issues.map(issue => {
                    const isSelected = campaign.isSelected(issue.id)
                    const selectedClass = isSelected ? " selected" : ""
                    const clickFn = isSelected ? 
                        deselectIssue.bind(this, campaign, issue.id) :
                        selectIssue.bind(this, campaign, issue.id)

                    return (
                        <li className={`campaign_issue${selectedClass}`} onclick={clickFn}>
                            {issue.description}
                        </li>
                    )
                })}
                </ul>
                <Link className="campaign_button" disabled={campaign.selectedIssues.length != 2} href={`/draft/issue?id=${campaign.selectedIssues[0]}`}>Next page</Link>
            </div>
            )
        }
    }
    
}