from rest_framework import viewsets
from api.models.models import Campaign, Recipient, Issue, Statement, Draft
from api.serializers.serializers import CampaignSerializer, RecipientSerializer, IssueSerializer, StatementSerializer, DraftSerializer


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer


class RecipientViewSet(viewsets.ModelViewSet):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


class StatementViewSet(viewsets.ModelViewSet):
    queryset = Statement.objects.all()
    serializer_class = StatementSerializer


class DraftViewSet(viewsets.ModelViewSet):
    queryset = Draft.objects.all()
    serializer_class = DraftSerializer
