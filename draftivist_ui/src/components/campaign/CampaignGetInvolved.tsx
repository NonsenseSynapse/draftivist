import * as m from "mithril";
import { BaseComponent, elementAttrs } from "../base"

type Attrs = {}

export default function (): BaseComponent<Attrs> {
    return {
        ...elementAttrs,
        view: (vnode) => {
            return (
               <div className="campaign_content">
                   <div className="campaign_content_main">
                        <div className="campaign_description">Get Involved.</div>
                        <div className="campaign_box">
                            <div className="campaign_box_description_small">Have a minute?</div>
                            <div className="campaign_box_image" />
                            <div className="campaign_box_description">Share this campaign!</div>
                            <div className="campaign_box_buttons">
                                <a className="campaign_box_button">Facebook</a>
                                <a className="campaign_box_button">Twitter</a>
                            </div>
                         </div>
                         <div className="campaign_box">
                            <div className="campaign_box_description_small">Have 3 minutes?</div>
                            <div className="campaign_box_description">Call a local legislator!</div>
                            <div className="campaign_box_description_small">(Your draft makes a great call script. Find it in your sent folder.)</div>
                            <div className="campaign_box_numbers">
                                {/* todo: get from api */}
                                <div className="campaign_box_number">
                                    <span className="campaign_box_number_digits">555-555-5555</span>
                                    <span className="campaign_box_number_name">Councilmember Xavier</span>
                                </div>
                                <div className="campaign_box_number">
                                    <span className="campaign_box_number_digits">777-777-7777</span>
                                    <span className="campaign_box_number_name">Mayor Hypnos</span>
                                </div>
                            </div>
                         </div>
                         <div className="campaign_box">
                            <div className="campaign_box_description_small">Free this Friday night?</div>
                            <div className="campaign_box_image" />
                            <div className="campaign_box_description">Join the Metropolis Civil Liberties Union weekly town hall meeting!</div>
                            <div className="campaign_box_description_small">Learn how our communities can organize to protect ourselves from the Evil Alliance.</div>
                            <div className="campaign_box_description_small">Learn more at:<br /><a>mclu.com/townhall</a></div>
                         </div>
                        <a className="campaign_button campaign_button-solo" onclick={() => history.back()}>Back</a>
                   </div>
               </div>
            )
        }
    }
}