
import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { elementAttrs, BaseComponent, Link } from "./base"


type Attrs = {
  campaign: Campaign
};

export default() : BaseComponent<Attrs>  => {
  let selectedIssues: number[];
  let firstSelectedIssue: Issue;
  return {
    ...elementAttrs,
    oninit: (vnode) => {
      console.log("in select statements")
      const firstIssueId = vnode.attrs.campaign.selectedIssues[0];
      firstSelectedIssue = vnode.attrs.campaign.issues[firstIssueId];
    },
    view: (vnode) => (
      <div>
        <h3>
          Select a statement for this issue:
        </h3>
        <h2>
          {
            vnode.attrs.campaign.selectedIssues[0]
          }
        </h2>
        <ul>
          {firstSelectedIssue.statements.map}
        </ul>
      </div>
    )
  }
}
