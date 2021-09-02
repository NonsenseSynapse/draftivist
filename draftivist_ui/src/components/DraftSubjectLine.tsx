import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"
import { PreviewDraftCTA } from './PreviewDraftCTA';


type Attrs = {
  campaign: Campaign
  issue: Issue
}

export default function (): BaseComponent<Attrs> {
  // add a function to save the subject line
  function saveDraft(campaign: Campaign, content: string) {

    campaign.saveToDraft('intro', content);
  }

  return {
    ...elementAttrs,
    view: (vnode) => {
      return (
        <div className='draft_body'>
          <div className="draft_section_heading">
            Finally, let’s get their attention with a strong subject line:
          </div>
          <form className="draft_contents" onSubmit={this.saveDraft(e.currentTarget.value)} >
            <div className="draft_section_title">
              Subject Line
            </div>
            <input />
            <textarea className="draft_custom_input_text_area" rows='6' cols='35'/>
            <div className="draft_section_description">
              Make it as short or as long as you’d like — and remember: the more unique, the better!
            </div>
            <PreviewDraftCTA />
            {/* make an m.route.Link component that is actually a button instead ofa n a under the hood
            OR do an m.route.set(route) in the on click for a button
            https://mithril.js.org/route.html#navigating-to-different-routes
            */}
          </form>
        </div>
      );
    }
  };
}
