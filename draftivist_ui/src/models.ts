import * as Mithril from "mithril"
import * as m from "mithril";

export class Statement {
    id: number
    description: string

    constructor(id: number, description: string) {
        this.id = id
        this.description = description
    }
}

export class Issue {
    id: number
    description: string

    constructor(id: number, description: string) {
        this.id = id
        this.description = description
    }

    statements: Statement[]
    selectedStatement: number = -1
    customStatement: string
    customStatementDraft: string

    selectStatement(id: number): void {
        this.selectedStatement = id;
    }

    saveCustomStatement(): void {
        this.clearSelectedStatements();
        this.customStatement = this.customStatementDraft;
    }

    isSelected(id: number) : boolean {
        return this.selectedStatement === id
    }

    clearSelectedStatements(): void {
        this.selectedStatement = -1;
    }
}

export class Campaign {
    id: number
    title: string
    description: string

    issues: Issue[]
    selectedIssues: number[] = []

    constructor(id: number, title: string, description: string) {
        this.id = id
        this.title = title
        this.description = description
    }

    getIssue(id: number): Issue {
        return this.issues.find(issue => issue.id === id)
    }

    selectIssue(id: number) {
        if (!this.isSelected(id)) {
            this.selectedIssues.push(id)
        }
    }

    deselectIssue(id: number) {
        const index = this.selectedIssues.indexOf(id)
        if (index > -1) {
            this.selectedIssues.splice(index, 1)
        }
    }

    isSelected(id: number) : boolean {
        return this.selectedIssues.indexOf(id) > -1
    }

    static parse(campaignData: any) {
        const campaign = new Campaign(campaignData.id, campaignData.name, campaignData.description)
        campaign.issues = campaignData.issues.map((issueData: any) => {
            const issue = new Issue(issueData.id, issueData.text)
            issue.statements = issueData.statements.map((statementData: any) =>
                new Statement(statementData.id, statementData.text))
            return issue
        })
        return campaign
    }

    static load(id: number): Promise<Campaign> {
        return m.request(`${__API_HOSTNAME__}/campaign/${id}`)
        .then(this.parse)
    }
}
