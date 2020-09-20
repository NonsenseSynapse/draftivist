from django.contrib import admin
from api.models.campaign import Campaign, StatementSelection, Draft, Statement, Issue
from django.urls import reverse
from django.utils.safestring import mark_safe


class IssueInline(admin.StackedInline):
    model = Issue
    fields = ['prompt_text', 'get_edit_link']
    readonly_fields = ['get_edit_link']

    def get_edit_link(self, obj):
        if obj.pk:
            url = reverse(f'admin:{obj._meta.app_label}_{obj._meta.model_name}_change',
                          args=str(obj.pk))
            return mark_safe(f'<a href={url}>Edit</a>')
        return '-'
    get_edit_link.short_description = 'Add/Edit Statements'


class CampaignAdmin(admin.ModelAdmin):
    inlines = (IssueInline,)


class StatementInline(admin.StackedInline):
    model = Statement
    readonly_fields = ['issue']


class IssueAdmin(admin.ModelAdmin):
    readonly_fields = ['campaign']
    inlines = (StatementInline,)
    fields = ['prompt_text', 'link_to_campaign']
    readonly_fields = ['link_to_campaign']

    def link_to_campaign(self, obj):
        parent_campaign = obj.campaign
        link = reverse(f'admin:{obj._meta.app_label}_{parent_campaign._meta.model_name}_change',
                       args=str(parent_campaign.id))
        return mark_safe(f'<a href={link}>{parent_campaign.name}</a>')
    link_to_campaign.short_description = 'Parent Campaign'


admin.site.register(Campaign, CampaignAdmin)
# admin.site.register(StatementSelection)
# admin.site.register(CampaignResponse)
admin.site.register(Issue, IssueAdmin)
# admin.site.register(Statement)
