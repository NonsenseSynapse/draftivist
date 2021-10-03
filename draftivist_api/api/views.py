from django.shortcuts import render
from rest_framework import viewsets

from api.models import (
    Campaign,
    Draft,
    StatementSubmission,
    SessionMeta,
)

from api.serializers import (
    CampaignSerializer,
    DraftSerializer,
    StatementSubmissionSerializer,
    SessionMetaSerializer,
)


class CampaignViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer


class DraftViewSet(viewsets.ModelViewSet):
    queryset = Draft.objects.all()
    serializer_class = DraftSerializer


class StatementSubmissionViewSet(viewsets.ModelViewSet):
    queryset = StatementSubmission.objects.all()
    serializer_class = StatementSubmissionSerializer


class SessionMetaViewSet(viewsets.ModelViewSet):
    queryset = SessionMeta.objects.all()
    serializer_class = SessionMetaSerializer
