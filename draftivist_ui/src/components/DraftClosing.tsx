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
    campaign.saveToDraft('conclusion', content);
  }

  let inputValue = '';

  return {
    ...elementAttrs,
    oninit: (vnode) => {
      if (vnode.attrs.campaign.draft.conclusion) {
        inputValue = vnode.attrs.campaign.draft.conclusion;
      }
    },
    view: (vnode) => {
      return (
        <div className='draft_body'>
          <div className="draft_section_heading">
            ...and a brief outro:
          </div>
          <div>
            <div class="draft_section_title">
              Closing
            </div>
            <textarea className="draft_custom_input_text_area" rows='6' cols='35' placeholder='For these reasons and more, we must pursue defunding as soon as possible, before even more damage is done to our fair city.

Thank you for your time,
John Doe' value={inputValue} oninput={(e: Event) => {
                inputValue = (e.target as HTMLInputElement).value;
                saveDraft(vnode.attrs.campaign, inputValue)
              }}>
            </textarea>
            <div className="draft_section_description">
              Include a closing thought, a sign off, and your name.
            </div>
            <PreviewDraftCTA />
            {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}

            <Link
              className="campaign_button campaign_button-emphasized campaign_button-two"
              href={`/draft/subject-line`}>
              Next
            </Link>
          </div>
        </div>
      );
    }
  };
}
