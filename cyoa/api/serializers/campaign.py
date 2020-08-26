from api.models.campaign import Campaign, Statement, Issue, StatementSelection, CampaignResponse
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class StatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statement
        fields = ['id', 'statement_text']


class IssueSerializer(serializers.ModelSerializer):
    options = StatementSerializer(many=True)

    class Meta:
        model = Issue
        fields = ['id', 'prompt_text', 'statements']


class CampaignSerializer(serializers.ModelSerializer):
    issues = IssueSerializer(many=True)

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'created', 'issues']


class ResponseIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ['id', 'prompt_text']


class ResponseStatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statement
        fields = ['id', 'statement_text']


class StatementSelectionSerializer(serializers.ModelSerializer):
    issue = ResponseIssueSerializer()
    statement = ResponseStatementSerializer()

    class Meta:
        model = StatementSelection
        fields = ['issue', 'statement']


class CampaignResponseSerializer(serializers.ModelSerializer):
    campaign = serializers.PrimaryKeyRelatedField(queryset=Campaign.objects.all())
    selections = StatementSelectionSerializer(many=True)

    class Meta:
        model = CampaignResponse
        exclude = ['created']


class CampaignSubmitSerializer(serializers.Serializer):
    campaign_id = serializers.PrimaryKeyRelatedField(required=True, queryset=Campaign.objects.all())
    selections = serializers.ListField(required=True)

    class Meta:
        fields = ['campaign_id', 'selections']

    def validate_selections(self, value):
        issue_ids = []
        statement_ids = []

        for selection_set in value:
            if not isinstance(selection_set, dict):
                raise ValidationError('One or more selections are not in a JSON parsable format.')

            if 'issue' not in selection_set or 'statement' not in selection_set:
                raise ValidationError('Either "issue" or "statement" key missing from an answer.')

            if not isinstance(selection_set['issue'], int) or not isinstance(selection_set['statement'], int):
                raise ValidationError('Invalid data time for issue or statement id.')

            issue_ids.append(selection_set['issue'])
            statement_ids.append(selection_set['statement'])

        num_valid_selections = (Statement.objects
                                .filter(id__in=statement_ids)
                                .filter(issue__campaign_id=self.initial_data['campaign_id'])
                                ).count()

        if num_valid_selections != len(value):
            raise ValidationError('One or more of the selected options are not valid for this campaign.')

        return value

    def create(self, validated_data):
        campaign_response = CampaignResponse(campaign=validated_data['campaign_id'])
        campaign_response.save()

        for selection_set in validated_data['selections']:
            answer = StatementSelection(campaign_response=campaign_response,
                                        issue_id=selection_set['issue'],
                                        statement_id=selection_set['statement'])
            answer.save()

        return CampaignResponseSerializer(campaign_response).data
