import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
    campaign: Campaign
    issue: Issue
}

export default function() : BaseComponent<Attrs> {

    let campaign: Campaign
    let issue: Issue
    let selectedIssueIndex: number

    function refresh(vnode: m.Vnode<Attrs, {}>) {
        campaign = vnode.attrs.campaign
        issue = vnode.attrs.issue

        selectedIssueIndex = campaign.selectedIssues.indexOf(issue.id)
    }

    function selectStatement(id: number) {
        issue.selectStatement(id)
    }

    return {
        ...elementAttrs,
        oninit: (vnode) => {
            refresh(vnode)
        },
        onbeforeupdate: (vnode) => {
            // todo: is this best practice? basically because we're reassigning
            // vnode params to closure variables, we need to call this before
            // the update so the view fn picks up the new vars...this seems dumb tbh
            refresh(vnode)
            return true
        },
        view: () =>
            <div>
                <h2>{issue.description}</h2>
                <h3>Select a statement for this issue:</h3>
                {issue.statements.map(statement => 
                    <li onclick={selectStatement.bind(this, statement.id)}>
                        { issue.isSelected(statement.id) ? 
                            <b>{statement.description}</b> : 
                            <span>{statement.description}</span>
                        }
                    </li>    
                )}
                <p>
                { selectedIssueIndex < campaign.selectedIssues.length-1 ?
                    <Link disabled={issue.selectedStatement < 0} href={`/draft/issue?id=${campaign.selectedIssues[selectedIssueIndex+1]}`}>Next issue</Link> :
                    <Link disabled={issue.selectedStatement < 0} href="/draft/intro">Next</Link>
                }
                </p>
            </div>
    }
}