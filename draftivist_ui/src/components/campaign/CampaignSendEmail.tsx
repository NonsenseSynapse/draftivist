import * as m from "mithril";
import { Campaign } from "../../models";
import { BaseComponent, elementAttrs } from "../base"
import EmailButton from "./EmailButton";

type Attrs = {
    campaign: Campaign
}

export default function (): BaseComponent<Attrs> {

    function copyDraft(campaign: Campaign) {
        const text = "TEXT"
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    }
    
    return {
        ...elementAttrs,
        view: (vnode) => {
            const { campaign } = vnode.attrs
            return (
               <div className="campaign_content">
                    <div className="campaign_content_main campaign_content_main-email">
                        <div className="campaign_description">Send your email!</div>
                        <div className="campaign_description_small">
                            Choose your email service below to open your ready-to-send email.
                        </div>
                        <div className="campaign_email_section">
                            <div className="campaign_description_tiny">Send from your default email app.</div>
                            <div className="campaign_emails">
                                <EmailButton client="mailto">Go to Email</EmailButton>
                            </div>
                        </div>
                        <div className="campaign_email_section">
                            <div className="campaign_description_tiny">Don’t have an email app set up? Use a webmail link.</div>
                            <div className="campaign_emails">
                                <EmailButton client="gmail">Gmail</EmailButton>
                                <EmailButton client="yahoo">Yahoo</EmailButton>
                                <EmailButton client="outlook">Outlook, Hotmail, or Live Mail</EmailButton>
                                <EmailButton client="aol">Aol</EmailButton>
                            </div>
                        </div>
                        <div className="campaign_email_section">
                            <div onclick={copyDraft.bind(this, campaign)} className="campaign_description_tiny">Don’t see your email service?<br /><span class="underline">Copy &amp; paste your draft.</span></div>
                        </div>
                    </div>
                    <a className="campaign_button campaign_button-solo" onclick={() => history.back()}>Back</a>
               </div>
            )
        }
    }
}