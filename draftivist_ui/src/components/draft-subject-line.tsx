import * as m from "mithril";
import { Campaign, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
  campaign: Campaign
  issue: Issue
}

export default function (): BaseComponent<Attrs> {
  // add a function to save the subject line

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
              Subject Line
            </div>
            <input />
          </div>
        </div>
      );
    }
  };
}
