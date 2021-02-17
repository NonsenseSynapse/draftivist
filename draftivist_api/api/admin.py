from django.contrib import admin
from api.models.models import Campaign, Recipient, Issue, Statement, Draft, StatementSubmission, SessionMeta, Organization, Member

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'organization', 'description', 'created', 'start_date', 'end_date', 'is_active', 'allow_custom_statements']
    ordering = ['id']

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
