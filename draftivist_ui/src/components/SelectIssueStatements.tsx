
import * as m from "mithril";
import { Campaign } from "../models"
import { elementAttrs, BaseComponent, Link } from "./base"


type Attrs = {
  campaign: Campaign
};

export default() : BaseComponent<Attrs> {
  return {
    ...elementAttrs,
    view: () => (
      <div>
        
      </div>
    )
  }
}
