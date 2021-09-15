import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"
import { PreviewDraftCTA } from './PreviewDraftCTA';


type Attrs = {
  campaign: Campaign
  issue: Issue
}

export default function (): BaseComponent<Attrs> {

  function saveDraft(campaign: Campaign, content: string) {
    campaign.saveToDraft('intro', content);
    // add navigation to the next page here
  }

  let emailInputValue: string;
  let subjectLineInputValue: string;
  let draftReviewInputValue: string;

  return {
    ...elementAttrs,
    view: (vnode) => {
      return (
        <div className='draft_body'>
          <div className="draft_section_heading">
            Review your draft.
          </div>
          <form className="draft_contents" onSubmit={() => saveDraft(vnode.attrs.campaign, emailInputValue)} >
            <div className="draft_section_title">
              This email is going to
            </div>
            <input />
            <div className="draft_section_title">
              Subject Line
            </div>
            <input value={subjectLineInputValue} oninput={(e: Event) => subjectLineInputValue = (e.target as HTMLInputElement).value}/>
            <div className="draft_section_title">
              Review your draft
            </div>
            <textarea className="draft_custom_input_text_area" rows='6' cols='35' value={draftReviewInputValue} oninput={(e: Event) => draftReviewInputValue = (e.target as HTMLInputElement).value}/>
            <PreviewDraftCTA />
            {/* make an m.route.Link component that is actually a button instead ofa n a under the hood
            OR do an m.route.set(route) in the on click for a button
            https://mithril.js.org/route.html#navigating-to-different-routes
            */}
            <button type='submit' value="Next"/>
          </form>
        </div>
      );
    }
  }
}
