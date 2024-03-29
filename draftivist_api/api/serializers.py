from rest_framework import serializers
from api.models import Campaign, Recipient, Issue, Statement, Draft, StatementSubmission, SessionMeta, Organization


class RecipientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Recipient
        fields = ['id', 'email_address', 'name', 'phone']


class CampaignStatementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Statement
        fields = ['id', 'text', 'is_active']


class CampaignIssueSerializer(serializers.ModelSerializer):
    statements = serializers.SerializerMethodField()

    class Meta:
        model = Issue
        fields = ['id', 'title', 'text', 'is_active', 'statements']

    def get_statements(self, issue):
        statements = issue.statements.filter(is_active=True)
        return CampaignStatementSerializer(statements, many=True).data


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'short_name']


class CampaignSerializer(serializers.ModelSerializer):
    recipients = RecipientSerializer(many=True, read_only=True)
    issues = serializers.SerializerMethodField()
    organization = OrganizationSerializer(read_only=True)

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'description', 'organization', 'start_date', 'end_date', 'recipients', 'issues',
                  'is_active', 'allow_custom_statements']

    def get_issues(self, campaign):
        issues = campaign.issues.filter(is_active=True)
        return CampaignIssueSerializer(issues, many=True).data


class DraftSerializer(serializers.ModelSerializer):
    campaign = serializers.PrimaryKeyRelatedField(queryset=Campaign.objects.all(), allow_null=False)
    issue = serializers.PrimaryKeyRelatedField(queryset=Issue.objects.all(), allow_null=True)
    statements = serializers.PrimaryKeyRelatedField(queryset=Statement.objects.all(), allow_null=True, many=True)
    status = serializers.ChoiceField(default='STARTED', choices=[('STARTED', 'Started'), ('IN_PROGRESS', 'In Progress'), ('COMPLETED', 'Completed')])

    class Meta:
        model = Draft
        fields = ['id', 'campaign', 'issue', 'statements', 'created', 'status', 'session_key']


class StatementSubmissionSerializer(serializers.ModelSerializer):
    issue = serializers.PrimaryKeyRelatedField(queryset=Issue.objects.all(), allow_null=True)
    status = serializers.ChoiceField(choices=[('NEEDS_REVIEW', 'Needs Review'), ('REJECTED', 'Rejected'), ('ACCEPTED', 'Accepted')])
    # FKs to reviewer?

    class Meta:
        model = StatementSubmission
        fields = ['id', 'text', 'issue', 'created', 'status', 'reviewer']


class SessionMetaSerializer(serializers.ModelSerializer):

    class Meta:
        model = SessionMeta
        fields = ['id', 'session_key', 'remote_addr', 'user_agent']

