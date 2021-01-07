import * as m from "mithril";
import Campaign from "./components/Campaign";

import './css/main.css'

m.route(document.body, "/draft/landing", {
    "/draft/:page": Campaign,
})
