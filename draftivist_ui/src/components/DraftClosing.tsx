import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"
import { PreviewDraftCTA} from './PreviewDraftCTA';

type Attrs = {
  campaign: Campaign
  issue: Issue
}

export default function (): BaseComponent<Attrs> {
  // add a function to save the intro
  // add a function to save the conclusion

  return {
    ...elementAttrs,
    view: (vnode) => {
      return (
        <div className='draft_body'>
          <div className="draft_section_heading">
            ...and a brief outro:
          </div>
          <div className='draft_contents'>
            <div class="draft_section_title">
              Closing
            </div>
            <textarea className="draft_custom_input_text_area" rows='6' cols='35' placeholder='For these reasons and more, we must pursue defunding as soon as possible, before even more damage is done to our fair city.

Thank you for your time,
John Doe'>
            </textarea>
            <div className="draft_section_description">
            Include a closing thought, a sign off, and your name.
            </div>
            <PreviewDraftCTA />
          </div>
        </div>
      );
    }
  };
}
