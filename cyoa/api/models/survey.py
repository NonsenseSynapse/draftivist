from django.db import models


class Survey(models.Model):
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now=True)


class Question(models.Model):
    question_text = models.CharField(max_length=1024)
    survey = models.ForeignKey('Survey', on_delete=models.CASCADE, related_name='questions')
    created = models.DateTimeField(auto_now=True)


class QuestionOption(models.Model):
    description = models.CharField(max_length=1024)
    question = models.ForeignKey('Question', on_delete=models.CASCADE, related_name='options')
    created = models.DateTimeField(auto_now=True)


class SurveyResponse(models.Model):
    survey = models.ForeignKey('Survey', on_delete=models.CASCADE, related_name='responses')
    created = models.DateTimeField(auto_now=True)


class SurveyAnswer(models.Model):
    survey_response = models.ForeignKey('SurveyResponse', on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    question_option = models.ForeignKey('QuestionOption', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)