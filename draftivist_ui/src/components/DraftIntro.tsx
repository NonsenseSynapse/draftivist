import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"
import { PreviewDraftCTA} from './PreviewDraftCTA';

type Attrs = {
  campaign: Campaign
}

export default function (): BaseComponent<Attrs> {
  // add a function to save the intro to the campaign object
  // add a function to save the conclusion

  return {
    ...elementAttrs,
    view: (vnode) => {
      return (
        <div className='draft_body'>
          <div className="draft_section_heading">
            Almost there! We just need a brief intro…
          </div>
          <div className="draft_contents">
            <div className="draft_section_title">
              Introduction
            </div>
            <textarea className="draft_custom_input_text_area" rows='6' cols='35' placeholder='My name is John Doe, a citizen of the silver district, and I’m writing to you today to defund the Evil Alliance.'>
            </textarea>
            <div className="draft_section_description">
            Include your name, where you live, and why you’re writing today.
            </div>
            <PreviewDraftCTA />
          </div>
        </div>
      );
    }
  };
}
