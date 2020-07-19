from django.contrib import admin
from api.models.survey import Survey, SurveyAnswer, SurveyResponse, QuestionOption, Question

# Register your models here.
admin.site.register(Survey)
admin.site.register(SurveyAnswer)
admin.site.register(SurveyResponse)
admin.site.register(Question)
admin.site.register(QuestionOption)
