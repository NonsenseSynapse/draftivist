
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
      console.log(firstSelectedIssue)
    },
    view: (vnode) => (
      <div>
        <h2>
          {
            firstSelectedIssue && firstSelectedIssue.description
          }
        </h2>
        <h3>
          Select a statement for this issue:
        </h3>
        <ul>
          {firstSelectedIssue && firstSelectedIssue.statements.map(statement => (
            <li>
              {statement.description}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
