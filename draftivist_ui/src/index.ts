import * as m from "mithril";
import smoothscroll from "smoothscroll-polyfill";

import Campaign from "./components/campaign/Campaign";

import './css/main.scss'

smoothscroll.polyfill()

m.route(document.getElementById('mount'), "/draft/landing", {
    "/draft/:page": Campaign,
})
