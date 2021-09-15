import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"
import { PreviewDraftCTA } from './PreviewDraftCTA';

type Attrs = {
  campaign: Campaign
}

export default function (): BaseComponent<Attrs> {
  // add a function to save the intro to the campaign object
  // add a function to save the conclusion

  function saveDraft(campaign: Campaign, content: string) {
    campaign.saveToDraft('intro', content);
    console.log("in on save", content, campaign.draft)
    m.route.set(`/draft/conclusion`)
    // add navigation to the next page here
  }

  let inputValue = '';


  return {
    ...elementAttrs,
    view: (vnode) => {
      console.log(inputValue)
      return (
        <div className='draft_body'>
          <div className="draft_section_heading">
            Almost there! We just need a brief intro…
          </div>
          <form className="draft_contents" onsubmit={() => saveDraft(vnode.attrs.campaign, inputValue)}>

            <div className="draft_section_title">
              Introduction
            </div>
            <textarea className="draft_custom_input_text_area" rows='6' cols='35' placeholder='My name is John Doe, a citizen of the silver district, and I’m writing to you today to defund the Evil Alliance.' oninput={(e: Event) => {
              inputValue = (e.target as HTMLInputElement).value
            }}>
            </textarea>
            <div className="draft_section_description">
              Include your name, where you live, and why you’re writing today.
            </div>
            <PreviewDraftCTA />
            {<a className="campaign_button campaign_button-one" onclick={() => history.back()}>Back</a>}
            <button type='submit'>

        <Link
            className="campaign_button campaign_button-emphasized campaign_button-two"
            href={`/draft/conclusion`}>
                Next
        </Link>
            </button>
            {/* <button type='submit' value="Next" /> */}
          </form>
        </div >
      );
    }
  };
}
