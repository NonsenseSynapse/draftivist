import * as m from "mithril";
import { Campaign, Issue } from "../../models"
import { BaseComponent, Link, elementAttrs } from "../base"
import { PreviewDraftCTA } from '../PreviewDraftCTA';


type Attrs = {
  campaign: Campaign
  issue: Issue
}

export default function (): BaseComponent<Attrs> {

  function saveDraft(campaign: Campaign, content: string) {
    campaign.saveToDraft('intro', content);
  }

  let emailAddressInputValue: string;
  let subjectLineInputValue: string;
  let draftReviewInputValue: string;

  return {
    ...elementAttrs,
    oninit: (vnode) => {
      const { intro, conclusion, subjectLine } = vnode.attrs.campaign.
        draft;
      subjectLineInputValue = subjectLine;
      draftReviewInputValue = `${intro} ${conclusion}`;
    },
    view: (vnode) => {
      const { intro, conclusion } = vnode.attrs.campaign.draft;
      return (
        <div className='draft_body'>
          <div className="draft_section_heading">
            Review your draft.
          </div>
          <form className="draft_contents" onSubmit={() => saveDraft(vnode.attrs.campaign, emailAddressInputValue)} >
            <div className="draft_section_title">
              This email is going to
            </div>
            <input className="draft_input" value={emailAddressInputValue} />
            <div className="draft_section_title">
              Subject Line
            </div>
            <input className="draft_input" value={subjectLineInputValue} oninput={(e: Event) => subjectLineInputValue = (e.target as HTMLInputElement).value} />
            <div className="draft_section_title">
              Review your draft
            </div>
            <textarea className="draft_custom_input_text_area" rows='6' cols='35' oninput={(e: Event) => draftReviewInputValue = (e.target as HTMLInputElement).value}>

                {intro}&#10;&#10;
              <br />
              {conclusion}
              <br />
            </textarea>
            <PreviewDraftCTA />
            {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}

              <Link
                className="campaign_button campaign_button-emphasized campaign_button-two"
                href={`/draft/conclusion`}>
                Next
              </Link>
          </form>
        </div>
      );
    }
  }
}
