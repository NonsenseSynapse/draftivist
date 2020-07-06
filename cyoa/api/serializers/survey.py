from api.models.survey import Survey, QuestionOption, Question, SurveyAnswer
from rest_framework import serializers


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ['id', 'description']


class QuestionSerializer(serializers.ModelSerializer):
    options = QuestionOptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'options']


class SurveySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Survey
        fields = ['id', 'name', 'created', 'questions']


class SurveyAnswerSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(read_only=True)
    question_option = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = SurveyAnswer
        fields = ['question', 'question_option']