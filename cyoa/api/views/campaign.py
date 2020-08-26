from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.core.exceptions import ObjectDoesNotExist

from api.serializers.campaign import CampaignSerializer, CampaignSubmitSerializer, CampaignResponseSerializer
from api.models.campaign import Campaign, CampaignResponse


class CampaignViewSet(viewsets.ReadOnlyModelViewSet):
    """
    """
    queryset = Campaign.objects.all().order_by('-created')
    serializer_class = CampaignSerializer

    @action(detail=True, methods=['post'])
    def submit(self, request, pk):
        data = request.data
        data['campaign_id'] = pk
        serializer = CampaignSubmitSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            campaign_response = serializer.save()
            return Response(campaign_response)


class CampaignResponseView(generics.RetrieveAPIView):
    queryset = CampaignResponse.objects.all()
    serializer_class = CampaignResponseSerializer

    def get(self, request, pk, *args, **kwargs):
        try:
            response = CampaignResponse.objects.get(pk=pk)
            serializer = CampaignResponseSerializer(response)
            return Response(serializer.data)
        except ObjectDoesNotExist:
            raise NotFound
