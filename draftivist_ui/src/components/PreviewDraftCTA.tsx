import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
  campaign: Campaign
  issue: Issue
}

export function PreviewDraftCTA (): BaseComponent<Attrs> {
  // add a function to save the intro
  // add a function to save the conclusion

  return {
    ...elementAttrs,
    view: (vnode) => {
      return (
        <div className='draft_preview'>
          <div className="draft_preview_icon">
          Preview draft
          </div>
        </div>
      );
    }
  };
}
