import * as m from "mithril";
import Campaign from "./components/Campaign";

m.route(document.body, "/draft/0", {
    "/draft/:index": Campaign
})