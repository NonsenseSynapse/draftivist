import * as m from "mithril";
import { Campaign } from "../../models";
import { BaseComponent, elementAttrs } from "../base"

type EmailClient = "gmail" | "yahoo" | "outlook" | "aol" | "mailto"

type Attrs = {
    client: EmailClient,
    campaign: Campaign
}

const ICONS: { [key in EmailClient]: any } = {
    "gmail":    require("../../assets/images/email/email_gmail.svg"),
    "yahoo":    require("../../assets/images/email/email_yahoo.svg"),
    "outlook":  require("../../assets/images/email/email_outlook.svg"),
    "aol":      require("../../assets/images/email/email_aol.svg"),
    "mailto":   null
}

// iCloud can't set subject and body from weblink as far as I can tell so we can't use it here :(
const URLS: { [key in EmailClient]: string } = {
    "gmail":    "https://mail.google.com/mail/?view=cm&fs=1&su=$1&body=$2&to=$3",
    "yahoo":    "http://compose.mail.yahoo.com/?subj=$1&body=$2&to=$3",
    "outlook":  "https://outlook.live.com/default.aspx?rru=compose&subject=$1&body=$2&to=$3",
    "aol":      "http://mail.aol.com/mail/compose-message.aspx?subject=$1&body=$2&to=$3",
    "mailto":   "mailto:$3?subject=$1&body=$2"
}

export default function (): BaseComponent<Attrs> {

    function url(client: EmailClient, campaign: Campaign) {
        return URLS[client]
            .replace("$1", "SUBJECT")
            .replace("$2", "BODY")
            .replace("$3", "TO")
    }

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { client, campaign } = vnode.attrs
            return (
                <a className="campaign_email" target="_blank" href={url(client, campaign)}>
                    {ICONS[client] && <img src={ICONS[client]} className="campaign_email_icon" />}
                    {vnode.children}
                </a>
            )
        }
    }
}