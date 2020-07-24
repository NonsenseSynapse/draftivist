from api.models.survey import Survey, QuestionOption, Question, SurveyAnswer, SurveyResponse
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


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
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    question_option = serializers.PrimaryKeyRelatedField(queryset=QuestionOption.objects.all())

    class Meta:
        model = SurveyAnswer
        fields = ['question', 'question_option']


class SurveyResponseSerializer(serializers.ModelSerializer):
    survey = serializers.PrimaryKeyRelatedField(queryset=Survey.objects.all())
    answers = SurveyAnswerSerializer(many=True)

    class Meta:
        model = SurveyResponse
        fields = '__all__'


class SurveySubmitSerializer(serializers.Serializer):
    survey_id = serializers.PrimaryKeyRelatedField(required=True, queryset=Survey.objects.all())
    answers = serializers.ListField(required=True)

    class Meta:
        fields = ['survey_id', 'answers']

    def validate_answers(self, value):
        question_ids = []
        question_option_ids = []

        for answer_set in value:
            if not isinstance(answer_set, dict):
                raise ValidationError('One or more answers are not in a JSON parsable format.')

            if 'question' not in answer_set or 'question_option' not in answer_set:
                raise ValidationError('Either "question" or "question_option" key missing from an answer.')

            question_ids.append(answer_set['question'])
            question_option_ids.append(answer_set['question_option'])

        num_valid_selections = (QuestionOption.objects
                                .filter(id__in=question_option_ids)
                                .filter(question__survey_id=self.initial_data['survey_id'])
                                ).count()

        if num_valid_selections != len(value):
            raise ValidationError('Not all questions have been answered.')

        return value

    def create(self, validated_data):
        survey_response = SurveyResponse(survey=validated_data['survey_id'])
        survey_response.save()

        for answer_set in validated_data['answers']:
            answer = SurveyAnswer(survey_response=survey_response,
                                  question_id=answer_set['question'],
                                  question_option_id=answer_set['question_option'])
            answer.save()

        return SurveyResponseSerializer(survey_response).data
