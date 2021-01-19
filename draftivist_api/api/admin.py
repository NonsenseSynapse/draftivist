from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe
from api.models.models import Campaign, Recipient, Issue, Statement, Draft, StatementSubmission, SessionMeta, Organization, Member

admin.site.site_header = 'Draftivist'
admin.site.index_title = 'Data Admin'
admin.site.site_title = 'Draftivist Admin'

class RecipientInline(admin.TabularInline):
    model = Campaign.recipients.through
    extra = 1
    verbose_name = "Recipient"
    verbose_name_plural = "Recipients"

class IssueInline(admin.TabularInline):
    model = Issue
    extra = 1
    verbose_name = "Issue"
    verbose_name_plural = "Issues"
    fields = ['text', 'get_edit_link']
    readonly_fields = ['get_edit_link']

    def get_edit_link(self, obj):
        if obj.pk:
            url = reverse(f'admin:{obj._meta.app_label}_{obj._meta.model_name}_change',
                          args=str(obj.pk))
            return mark_safe(f'<a href={url}>Edit</a>')
        return '-'
    get_edit_link.short_description = 'Add/Edit Issues'


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'organization', 'description', 'created', 'start_date', 'end_date', 'is_active', 'allow_custom_statements']
    ordering = ['id']
    inlines = [RecipientInline, IssueInline]
    fieldsets = [
        (None, {'fields': ['name', 'organization', 'description', 'allow_custom_statements']}),
        ('Dates', {'fields': ['start_date', 'end_date']}),
    ]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs

        grp = request.user.groups.first()
        return qs.filter(organization=grp.organization)


admin.site.register(Recipient)
admin.site.register(Issue)
admin.site.register(Statement)
admin.site.register(Draft)
admin.site.register(StatementSubmission)
admin.site.register(SessionMeta)
admin.site.register(Organization)
admin.site.register(Member)
