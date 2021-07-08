import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"

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
            Adding a personal touch helps your email stand out.
          </div>
          <div className="draft_contents">
            <div className="draft_section_title">
              Introduction
            </div>
            <textarea className="draft_custom_input" rows='6' cols='35' placeholder='My name is John Doe, a citizen of the silver district, and I’m writing to you today to defund the Evil Alliance.'>
            </textarea>
            <div className="draft_section_description">
              Make sure to include your name, where you live, and why you’re writing today!
            </div>
          </div>
          <div className='draft_contents'>
            <div class="draft_section_title">
              Closing
            </div>
            <textarea className="draft_custom_input" rows='6' cols='35' placeholder='Thank you for your time,
John Doe'>
            </textarea>
            <div className="draft_section_description">
              Add a sign off and your name.
            </div>
          </div>
        </div>
      );
    }
  };
}
