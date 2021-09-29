import * as m from "mithril";
import { BaseComponent, elementAttrs } from "../base"
import Dialog, { getDialog } from "../Dialog"

let draftIcon = require("../../assets/images/draft-icon.png")

type Attrs = {
    index: number
}

const DURATION_MILLIS = 1500

export function showInterstitial(index: number, nextPage: string) {
    let dialog = getDialog("interstitial").show()
    setTimeout(() => {
        m.route.set(`/draft/${nextPage}`)
        // dialog.hide()
    }, DURATION_MILLIS)
}

// https://a11y-dialog.netlify.app/usage/markup
export default function() : BaseComponent<Attrs> {
    return {
        ...elementAttrs,
        view: (vnode) => {
            const { index } = vnode.attrs
            return (
                <Dialog style="full" id="interstitial">
                    <img className="campaign_interstitial_icon" src={draftIcon} />
                    <div className="campaign_interstitial_step">Step {index+1} of 4</div>
                    <div className="campaign_interstitial_message">Adding <em className="highlight">statement {index+1}</em> to your draft...</div>
                </Dialog>
            )
        }
    }
}