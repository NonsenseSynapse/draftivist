from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.core.exceptions import ObjectDoesNotExist

from api.serializers.survey import SurveySerializer, SurveySubmitSerializer, SurveyResponseSerializer
from api.models.survey import Survey, SurveyResponse


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


class SurveyResponseView(generics.RetrieveAPIView):
    queryset = SurveyResponse.objects.all()
    serializer_class = SurveyResponseSerializer

    def get(self, request, pk, *args, **kwargs):
        try:
            response = SurveyResponse.objects.get(pk=pk)
            serializer = SurveyResponseSerializer(response)
            return Response(serializer.data)
        except ObjectDoesNotExist:
            raise NotFound
