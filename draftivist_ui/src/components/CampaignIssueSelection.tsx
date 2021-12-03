import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { elementAttrs, BaseComponent, Link } from "./base"

type Attrs = {
    campaign: Campaign
    pageIndex: number // 0, 1, 2
}

const page_index_to_ordinal = ["first", "second", "third"]

const descriptions = [
    "Your email will focus on 3 key issues. Choose your 1st issue below:",
    "Now, choose your 2nd issue:",
    "Finally, choose your 3rd issue:"
]

export default function() : BaseComponent<Attrs> {

    function selectIssue(campaign: Campaign, pageIndex: number, id: number) {
        if (campaign.selectedIssues.indexOf(id) > -1) {
            // issue already selected, do nothing
            return
        }
        if (campaign.selectedIssues[pageIndex]) {
            // deselect last selected issue before selecting new one
            campaign.deselectIssue(campaign.selectedIssues[pageIndex])
        }
        campaign.selectIssue(id)
    }

    function deselectIssue(campaign: Campaign, pageIndex: number, id: number) {
        const index = campaign.selectedIssues.indexOf(id)
        if (index == pageIndex) {
            // only deselect issue corresponding to this index
            campaign.deselectIssue(id)
        }
    }

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { campaign, pageIndex } = vnode.attrs
            console.log("campaign", campaign)
            return (
            <div className="campaign_content">
                <div className="campaign_content_main">
                    <h3 className="campaign_description">{descriptions[pageIndex]}</h3>
                    <ul className="campaign_issues">
                    {campaign.issues.map(issue => {
                        const isSelected = campaign.isSelected(issue.id)
                        let selectedClass = ""
                        if (isSelected) {
                            if (campaign.selectedIssues.indexOf(issue.id) == pageIndex) {
                                selectedClass = " selected"
                            } else {
                                selectedClass = " selected-disabled"
                            }
                        }

                        const clickFn = isSelected ?
                            deselectIssue.bind(this, campaign, pageIndex, issue.id) :
                            selectIssue.bind(this, campaign, pageIndex, issue.id)

                        return (
                            <li className={`campaign_issue${selectedClass}`} onclick={clickFn}>
                                {issue.description}
                            </li>
                        )
                    })}
                    </ul>
                </div>
                {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}
                <Link
                    className="campaign_button campaign_button-emphasized campaign_button-two"
                    disabled={campaign.selectedIssues.length <= pageIndex}
                    href={`/draft/issue?id=${campaign.selectedIssues[pageIndex]}`}>
                        Next
                </Link>
            </div>
            )
        }
    }

}
