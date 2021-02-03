from django.contrib import admin
from api.models.models import Campaign, Recipient, Issue, Image, Statement, Draft, StatementSubmission, SessionMeta, Organization, Member
from django.utils.html import format_html


class ImageInline(admin.StackedInline):
    model = Image
    fields = ['image', 'category', 'preview']
    extra = 0
    verbose_name = "Image"
    verbose_name_plural = "Images"
    readonly_fields = ['preview']

    def preview(self, obj):
        return format_html(f'<img src="{obj.image.url}" style="width: 65px; height:65px;" />')


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'organization', 'description', 'created', 'start_date', 'end_date', 'is_active', 'allow_custom_statements']
    ordering = ['id']
    inlines = [ImageInline]

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
