import * as m from "mithril";
import Campaign from "./components/Campaign";

m.route(document.body, "/draft/landing", {
    "/draft/:page": Campaign,
})