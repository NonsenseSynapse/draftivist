import * as m from "mithril";
import Campaign from "./components/Campaign";

import './css/main.scss'

m.route(document.getElementById('mount'), "/draft/landing", {
    "/draft/:page": Campaign,
})
