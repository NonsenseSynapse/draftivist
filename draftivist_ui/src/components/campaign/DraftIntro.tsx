import * as m from "mithril";
import { Campaign, Issue } from "../../models"
import { BaseComponent, Link, elementAttrs } from "../base"
import { PreviewDraftCTA } from '../PreviewDraftCTA';

type Attrs = {
  campaign: Campaign
}

export default function (): BaseComponent<Attrs> {

  function saveDraft(campaign: Campaign, content: string) {
    campaign.saveToDraft('intro', content);
  }
  let inputValue = '';

  return {
    ...elementAttrs,
    oninit: (vnode) => {
      //functionality to pull current draft as value
      if (vnode.attrs.campaign.draft.intro) {
        inputValue = vnode.attrs.campaign.draft.intro;
      }
    },
    view: (vnode) => {
      return (
        <div className='draft_body'>
          <div className="draft_section_heading">
            Almost there! We just need a brief intro…
          </div>
          <div className="draft_content">

            <div className="draft_section_title">
              Introduction
            </div>
            <textarea className="draft_custom_input_text_area" rows='6' cols='35' placeholder='My name is John Doe, a citizen of the silver district, and I’m writing to you today to defund the Evil Alliance.' value={inputValue} oninput={(e: Event) => {
              inputValue = (e.target as HTMLInputElement).value
              saveDraft(vnode.attrs.campaign, inputValue)
            }}>
            </textarea>
            <div className="draft_section_description">
              Include your name, where you live, and why you’re writing today.
            </div>
            <PreviewDraftCTA />
          </div>
          <div>

              {<a className="campaign_button draft_button-one" onclick={() => history.back()}>Back</a>}

              <Link
                className="campaign_button campaign_button-emphasized draft_button-two"
                href={`/draft/conclusion`}>
                Next
              </Link>
          </div>
        </div >
      );
    }
  };
}
