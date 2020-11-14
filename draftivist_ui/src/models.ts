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
}

export class Campaign {
    id: number
    title: string
    creator: string
    description: string

    issues: Issue[]
    selectedIssues: number[]

    constructor(id: number, title: string, creator: string, description: string) {
        this.id = id
        this.title = title
        this.creator = creator
        this.description = description
    }

    selectIssue(id: number) {
        if (this.selectedIssues.indexOf(id) == -1) {
            this.selectedIssues.push(id)
        }
    }

    deselectIssue(id: number) {
        const index = this.selectedIssues.indexOf(id)
        if (index > -1) {
            this.selectedIssues = this.selectedIssues.splice(index, 1)
        }
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
