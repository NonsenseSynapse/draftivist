import * as m from "mithril";
import { Statement, Issue } from "../../models"
import { BaseComponent, Link, elementAttrs } from "../base"

type Attrs = {
    issue: Issue
}

export default function (): BaseComponent<Attrs> {

    function onChangeHandler(e: Event, issue: Issue) {
        issue.customStatementDraft = (e.target as HTMLInputElement).value;
        if (issue.customStatementDraft.length > 0) {
            issue.saveCustomStatement()
        } else {
            issue.clearSelectedStatements()
        }
        return false;
    }

    function onClickHandler(issue: Issue) {
        if (issue.customStatementDraft.length > 0) {
            issue.saveCustomStatement()
        }
    }

    function handleSelect(issue: Issue, isSelected: boolean) {
        if (isSelected) {
            issue.clearSelectedStatements() 
        } else if (issue.customStatementDraft.length > 0) {
            issue.saveCustomStatement()
        }
    }

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { issue } = vnode.attrs
            const isSelected = issue.customStatement !== null
            const selectedClass = isSelected ? " selected" : "" 

            return (
                <div className={`campaign_statement${selectedClass}`} onclick={onClickHandler.bind(this, issue)}>
                    <div className="campaign_statement_content">
                        <div className="campaign_statement_title">Write Your Own</div>
                        <textarea 
                            className="campaign_statement_input" 
                            placeholder="Type here..." 
                            value={issue.customStatementDraft} 
                            oninput={(e: Event) => onChangeHandler(e, issue)} 
                        />
                    </div>
                    <a className="campaign_statement_button" onclick={handleSelect.bind(this, issue, isSelected)}>{isSelected ? "Unselect" : "Select"}</a>
                </div>
            )
        }
    }

}