import * as m from "mithril";
import { Campaign } from "../../models"
import { BaseComponent, Link, elementAttrs } from "../base"
import Dialog, { getDialog } from "../Dialog";

let placeholderImage = require("../../assets/images/placeholder-image.svg")

type Attrs = {
    campaign: Campaign
}

const TUTORIAL_DESCRIPTIONS = [
    "You’ll be drafting this email using Draftivist!",
    "With Draftivist, you can quickly create and send an original email by choosing a few pre-written statements.",
    "Unlike copied-and-pasted emails, these help you express your unique perspective (and help your email get past politicians’ inbox filters).",
    "Every Draftivist campaign is run by a verified advocacy group, so you can be confident that you’re representing a larger movement.",
    "It only takes a few minutes. Let’s get started!"
]

export default function() : BaseComponent<Attrs> {

    let tutorialIndex = 0

    return {
        ...elementAttrs,
        oncreate: (vnode) => {
            let dialog = getDialog("tutorial")
            setTimeout(() => {
                dialog.show()
            }, 300)
        },
        view: (vnode) => {
            const { title, description } = vnode.attrs.campaign
            return (
            <div className="campaign_content">
                <div className="campaign_hero">
                    <h1 className="campaign_title">{title}</h1>
                </div>
                <div className="campaign_content_main">
                    <div className="campaign_description">{description}</div>
                    <div className="campaign_description"><strong>Reach out to your elected officials today.</strong></div>
                    <Dialog id="tutorial">
                        <img className="tutorial_image" src={placeholderImage} />
                        <div className="tutorial_description">
                            {TUTORIAL_DESCRIPTIONS[tutorialIndex]}
                        </div>
                        <div className="tutorial_buttons">
                            { tutorialIndex > 0 && 
                                <a className="tutorial_button" onclick={() => tutorialIndex -= 1}>Back</a> 
                            }
                            { tutorialIndex < TUTORIAL_DESCRIPTIONS.length-1 && 
                                <a className="tutorial_button tutorial_button-emphasized" onclick={() => tutorialIndex += 1}>Next</a>
                            }
                            { tutorialIndex == TUTORIAL_DESCRIPTIONS.length-1 && 
                                <Link className="tutorial_button tutorial_button-emphasized" href="/draft/issues?issue_page=1">
                                    Get Started
                                </Link>
                            }
                        </div>
                    </Dialog>
                </div>
                <Link className="campaign_button campaign_button-emphasized" href="/draft/issues?issue_page=1">Draft Your Email</Link>
            </div>
            )
        }
    }
}