from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.core.exceptions import ObjectDoesNotExist

from api.serializers.campaign import CampaignSerializer, DraftSubmitSerializer, DraftSerializer
from api.models.campaign import Campaign, Draft


class CampaignViewSet(viewsets.ReadOnlyModelViewSet):
    """
    """
    queryset = Campaign.objects.all().order_by('-created')
    serializer_class = CampaignSerializer

    @action(detail=True, methods=['post'])
    def submit(self, request, pk):
        data = request.data
        data['campaign_id'] = pk
        serializer = DraftSubmitSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            draft = serializer.save()
            return Response(draft)


class DraftView(generics.RetrieveAPIView):
    queryset = Draft.objects.all()
    serializer_class = DraftSerializer

    def get(self, request, pk, *args, **kwargs):
        try:
            response = Draft.objects.get(pk=pk)
            serializer = DraftSerializer(response)
            return Response(serializer.data)
        except ObjectDoesNotExist:
            raise NotFound
