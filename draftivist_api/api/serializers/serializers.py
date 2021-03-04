from rest_framework import serializers
from api.models.models import Campaign, Recipient, Issue, Statement, Draft, StatementSubmission, SessionMeta


class RecipientSerializer(serializers.ModelSerializer):
    campaigns = serializers.PrimaryKeyRelatedField(queryset=Campaign.objects.all(), many=True)

    class Meta:
        model = Recipient
        fields = ['id', 'email_address', 'full_name', 'phone', 'created', 'campaigns']


class StatementSerializer(serializers.ModelSerializer):
    issue = serializers.PrimaryKeyRelatedField(queryset=Issue.objects.all(), allow_null=True)

    class Meta:
        model = Statement
        fields = ['id', 'text', 'issue', 'created', 'is_active']


class IssueSerializer(serializers.ModelSerializer):
    statements = StatementSerializer(many=True, read_only=True)
    campaign = serializers.PrimaryKeyRelatedField(queryset=Campaign.objects.all(), allow_null=True)

    class Meta:
        model = Issue
        fields = ['id', 'text', 'is_active', 'created', 'campaign', 'statements']


class CampaignSerializer(serializers.ModelSerializer):
    recipients = RecipientSerializer(many=True, read_only=True)
    issues = IssueSerializer(many=True, read_only=True)

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'description', 'organization', 'start_date', 'end_date', 'created', 'recipients', 'issues', 'is_active', 'allow_custom_statements']


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

