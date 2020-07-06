from rest_framework import viewsets
from api.serializers.survey import SurveySerializer
from api.models.survey import Survey


class SurveyViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Survey.objects.all().order_by('-created')
    serializer_class = SurveySerializer
