import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"
import { PreviewDraftCTA } from './PreviewDraftCTA';

type Attrs = {
  campaign: Campaign
}

export default function (): BaseComponent<Attrs> {
  // add a function to save the intro to the campaign object

  function saveDraft(campaign: Campaign, content: string) {
    campaign.saveToDraft('intro', content);
    console.log("in on save", content, campaign.draft)
    m.route.set(`/draft/conclusion`)
  }



  // add functionality to pull current draft as value
  let inputValue = '';


  return {
    ...elementAttrs,
    oninit: (vnode) => {
      if (vnode.attrs.campaign.draft.intro) {
        inputValue = vnode.attrs.campaign.draft.intro;
      }
      console.log("inputValue", inputValue)
      console.log(vnode.attrs.campaign.draft)
    },
    view: (vnode) => {
      return (
        <div className='draft_body'>
          <div className="draft_section_heading">
            Almost there! We just need a brief intro…
          </div>
          <form className="draft_contents" onsubmit={() => saveDraft(vnode.attrs.campaign, inputValue)}>

            <div className="draft_section_title">
              Introduction
            </div>
            <textarea className="draft_custom_input_text_area" rows='6' cols='35' placeholder='My name is John Doe, a citizen of the silver district, and I’m writing to you today to defund the Evil Alliance.' value={inputValue} oninput={(e: Event) => {
              inputValue = (e.target as HTMLInputElement).value
            }}>
            </textarea>
            <div className="draft_section_description">
              Include your name, where you live, and why you’re writing today.
            </div>
            <PreviewDraftCTA />
            {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}
              <button type='submit'>
                Next
              </button>

            <Link
              className="campaign_button campaign_button-emphasized campaign_button-two"
              href={`/draft/conclusion`}>
            </Link>
            {/* <button type='submit' value="Next" /> */}
          </form>
        </div >
      );
    }
  };
}
