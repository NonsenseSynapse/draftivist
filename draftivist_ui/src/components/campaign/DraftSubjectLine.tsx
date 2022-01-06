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
    campaign.saveToDraft('subjectLine', content);
    // add navigation to the next page here
  }

  let inputValue = '';

  return {
    ...elementAttrs,
    view: (vnode) => {
      return (
        <div className='draft_body'>
          <div className="draft_section_heading">
            Finally, let’s get their attention with a strong subject line:
          </div>
          <div className="draft_content">
            <div className="draft_section_title">
              Subject Line
            </div>
            <input />
            <textarea className="draft_custom_input_text_area" rows='6' cols='35' value={inputValue} oninput={(e: Event) => {
              inputValue = (e.target as HTMLInputElement).value;
              saveDraft(vnode.attrs.campaign, inputValue)
            }} />
            <div className="draft_section_description">
              Make it as short or as long as you’d like — and remember: the more unique, the better!
            </div>
            <PreviewDraftCTA />
            {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}

            <Link
              className="campaign_button campaign_button-emphasized campaign_button-two"
              href={`/draft/review`}>
              Next
            </Link>
          </div>
        </div>
      );
    }
  };
}
