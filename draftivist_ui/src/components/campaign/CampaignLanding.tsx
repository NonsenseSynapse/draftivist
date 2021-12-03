import * as m from "mithril";
import { Campaign } from "../../models"
import { BaseComponent, Link, elementAttrs } from "../base"
import Dialog, { getDialog } from "../Dialog";

type Attrs = {
    campaign: Campaign
}

const IMAGES = [
    require("../../assets/images/tutorial/page1.png"),
    require("../../assets/images/tutorial/page2.png"),
    require("../../assets/images/tutorial/page3.png"),
    require("../../assets/images/tutorial/page4.png"),
    require("../../assets/images/tutorial/page5.png")
]

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
            const { title, organizer } = vnode.attrs.campaign
            return (
            <div className="campaign_content">
                <div className="campaign_hero">
                    <h1 className="campaign_title">{title}</h1>
                    <div className="campaign_organizer">Created by {organizer}</div>
                </div>
                <div className="campaign_content_main">
                    <div className="campaign_landing_description">
                        {/** Note: dummy API needs to be updated with this new copy */}
                        <strong>Reaching out to:</strong> Mayor Hypnos, Councilmember Xavier
                    </div>
                    <div className="campaign_landing_description">
                        <strong>Call to action:</strong> The Evil Alliance, a group of city-funded super villains, have repeatedly harmed our city and evaded meaningful reform. We must defund the evil alliance, and refund our harmed communities.
                    </div>
                    <Dialog id="tutorial">
                        <img className="tutorial_image" src={IMAGES[tutorialIndex]} />
                        <div className="tutorial_description">
                            { tutorialIndex == 0 && <div className="tutorial_subtitle">MCLU + Draftivist</div>}
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