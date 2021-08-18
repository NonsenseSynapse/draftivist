import * as m from "mithril";
import { Statement, Issue } from "../models"
import { BaseComponent, Link, elementAttrs } from "./base"

type Attrs = {
    issue: Issue
    statement: Statement
}

export default function (): BaseComponent<Attrs> {

    function selectStatement(issue: Issue, id: number) {
        if (issue.isSelected(id)) {
            issue.clearSelectedStatements()
        } else {
            issue.selectStatement(id)
        }
    }

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { issue, statement } = vnode.attrs
            const isSelected = issue.isSelected(statement.id) 
            const selectedClass = isSelected ? " selected" : ""
            const statementIndex = issue.statements.indexOf(statement)

            return (
                <div className={`campaign_statement${selectedClass}`} onclick={selectStatement.bind(this, issue, statement.id)}>
                    <div className="campaign_statement_content">
                        <div className="campaign_statement_title">Statement {statementIndex+1}</div>
                        <div className="campaign_statement_text">{statement.description}</div>
                    </div>
                    <a className="campaign_statement_button">{isSelected ? "Unselect" : "Select"}</a>
                </div>
            )
        }
    }

}