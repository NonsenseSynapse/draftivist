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

    selectStatement(id: number) {
        this.selectedStatement = id
    }

    isSelected(id: number) : boolean {
        return this.selectedStatement === id
    }
}

export class Campaign {
    id: number
    title: string
    creator: string
    description: string

    issues: Issue[]
    selectedIssues: number[] = []

    constructor(id: number, title: string, creator: string, description: string) {
        this.id = id
        this.title = title
        this.creator = creator
        this.description = description,
        this.selectedIssues = [];
    }

    getIssue(id: number): Issue {
        return this.issues.find(issue => issue.id === id)
    }

    selectIssue(id: number) {
        if (!this.isSelected(id)) {
            this.selectedIssues.push(id)
            this.selectedIssues.sort()
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
        const campaign = new Campaign(campaignData.id, campaignData.title, campaignData.creator, campaignData.description)
        campaign.issues = campaignData.issues.map((issueData: any) => {
            const issue = new Issue(issueData.id, issueData.description)
            issue.statements = issueData.statements.map((statementData: any) =>
                new Statement(statementData.id, statementData.description))
            return issue
        })
        return campaign
    }
}
