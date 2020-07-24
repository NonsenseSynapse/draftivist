from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.serializers.survey import SurveySerializer, SurveySubmitSerializer
from api.models.survey import Survey


class SurveyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    """
    queryset = Survey.objects.all().order_by('-created')
    serializer_class = SurveySerializer

    @action(detail=True, methods=['post'])
    def submit(self, request, pk):
        data = request.data
        data['survey_id'] = pk
        serializer = SurveySubmitSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            survey_response = serializer.save()
            return Response(survey_response)
