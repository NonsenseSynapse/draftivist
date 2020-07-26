from django.contrib import admin
from api.models.survey import Survey, SurveyAnswer, SurveyResponse, QuestionOption, Question
from django.urls import reverse
from django.utils.safestring import mark_safe


class QuestionInline(admin.StackedInline):
    model = Question
    fields = ['question_text', 'get_edit_link']
    readonly_fields = ['get_edit_link']

    def get_edit_link(self, obj):
        if obj.pk:
            url = reverse(f'admin:{obj._meta.app_label}_{obj._meta.model_name}_change',
                          args=str(obj.pk))
            return mark_safe(f'<a href={url}>Edit</a>')
        return '-'
    get_edit_link.short_description = 'Add/Edit Options'


class SurveyAdmin(admin.ModelAdmin):
    inlines = (QuestionInline,)


class QuestionOptionInline(admin.StackedInline):
    model = QuestionOption
    readonly_fields = ['question']


class QuestionAdmin(admin.ModelAdmin):
    readonly_fields = ['survey']
    inlines = (QuestionOptionInline,)
    fields = ['question_text', 'link_to_survey']
    readonly_fields = ['link_to_survey']

    def link_to_survey(self, obj):
        parent_survey = obj.survey
        link = reverse(f'admin:{obj._meta.app_label}_{parent_survey._meta.model_name}_change',
                       args=str(obj.pk))
        return mark_safe(f'<a href={link}>{parent_survey.name}</a>')
    link_to_survey.short_description = 'Parent Survey'


admin.site.register(Survey, SurveyAdmin)
# admin.site.register(SurveyAnswer)
# admin.site.register(SurveyResponse)
admin.site.register(Question, QuestionAdmin)
# admin.site.register(QuestionOption)
