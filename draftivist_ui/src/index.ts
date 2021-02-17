import * as m from "mithril";
import Campaign from "./components/Campaign";

import './css/main.scss'

m.route(document.body, "/draft/landing", {
    "/draft/:page": Campaign,
})
