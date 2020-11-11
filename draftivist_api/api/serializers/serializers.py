from rest_framework import serializers
from api.models.models import Campaign, Recipient, Issue, Statement, Draft


class RecipientSerializer(serializers.ModelSerializer):
    campaigns = serializers.PrimaryKeyRelatedField(queryset=Campaign.objects.all(), many=True)

    class Meta:
        model = Recipient
        fields = ['id', 'email_address', 'name', 'created', 'campaigns']


class StatementSerializer(serializers.ModelSerializer):
    issue = serializers.PrimaryKeyRelatedField(queryset=Issue.objects.all(), allow_null=True)

    class Meta:
        model = Statement
        fields = ['id', 'statement_text', 'issue']


class IssueSerializer(serializers.ModelSerializer):
    statements = StatementSerializer(many=True, read_only=True)
    campaign = serializers.PrimaryKeyRelatedField(queryset=Campaign.objects.all(), allow_null=True)

    class Meta:
        model = Issue
        fields = ['id', 'prompt_text', 'is_active', 'created', 'campaign', 'statements']


class CampaignSerializer(serializers.ModelSerializer):
    recipients = RecipientSerializer(many=True, read_only=True)
    issues = IssueSerializer(many=True, read_only=True)

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'created', 'recipients', 'issues']


class DraftSerializer(serializers.ModelSerializer):
    campaign = serializers.PrimaryKeyRelatedField(queryset=Campaign.objects.all(), allow_null=False)
    issue = serializers.PrimaryKeyRelatedField(queryset=Issue.objects.all(), allow_null=True)
    statements = serializers.PrimaryKeyRelatedField(queryset=Statement.objects.all(), allow_null=True, many=True)

    class Meta:
        model = Draft
        fields = ['id', 'campaign', 'issue', 'statements', 'created', 'completed']
