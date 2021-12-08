import os
import pathlib
from django.contrib import admin
from django.db import models
from django.forms import Textarea, TextInput, ModelForm
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.safestring import mark_safe
from api.models import (Campaign, Recipient, Issue, Image, Statement,
                        Draft, StatementSubmission, SessionMeta, Organization)
from django.utils.html import format_html
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from PIL import Image as Img


admin.site.site_header = 'Draftivist'
admin.site.index_title = 'Data Admin'
admin.site.site_title = 'Draftivist Admin'

class InlineEditLink():
    """Mixin to add a link to a related model's edit page as part of a nested inline admin model"""
    # def __init__():
    #     pass
    
    def edit_link(self, obj):
        if obj.pk:
            url = reverse(f'admin:{obj._meta.app_label}_{obj._meta.model_name}_change',
                          args=str(obj.pk))
            return mark_safe(f'<a href={url}>Edit</a>')
        return '-'

    edit_link.short_description = 'Edit'


class RecipientInline(admin.TabularInline):
    model = Campaign.recipients.through
    extra = 1
    verbose_name = "Recipient"
    verbose_name_plural = "Recipients"


class IssueInline(admin.TabularInline, InlineEditLink):
    model = Issue
    extra = 1
    verbose_name = "Issue"
    verbose_name_plural = "Issues"
    fields = ['title', 'edit_link']
    readonly_fields = ['edit_link']


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
    list_display = ['name', 'created', 'start_date', 'end_date', 'is_active']
    list_display_links = ['name']
    ordering = ['id']
    inlines = [RecipientInline, IssueInline, ImageInline]
    fieldsets = [
        (None, {'fields': ['name', 'description', 'allow_custom_statements', 'is_active']}),
        ('Dates', {'fields': ['start_date', 'end_date']}),
    ]

    # def get_queryset(self, request):
    #     qs = super().get_queryset(request)
    #     if request.user.is_superuser:
    #         return qs

    #     grp = request.user.groups.first()
    #     return qs.filter(group=grp)

class OrganizationCampaignInline(admin.TabularInline, InlineEditLink):
    model = Campaign
    verbose_name = 'Campaign'
    verbose_name_plural = 'Campaigns'
    fields = ['name', 'created', 'start_date', 'end_date', 'edit_link']
    readonly_fields = ['name', 'created', 'start_date', 'end_date', 'edit_link']
    extra = 0

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['name', 'short_name', 'created']
    readonly_fields = ['created']
    inlines = [OrganizationCampaignInline]

class StatementInline(admin.TabularInline):
    model = Statement
    extra = 1
    verbose_name = "Statement"
    verbose_name_plural = "Statements"
    fields = ['text', 'is_active']
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows': 4, 'cols': 60})}
    }


class IssueAdminForm(ModelForm):
    class Meta:
        fields = ['title', 'text', 'is_active']
        model = Issue
        widgets = {
            'title':  TextInput(attrs={'size': 60}),
            'text': Textarea(attrs={'rows': 4, 'cols': 60})
        }


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    form = IssueAdminForm
    fields = ['campaign', 'title', 'text', 'is_active']
    ordering = ['id']
    readonly_fields = ['campaign']
    inlines = [StatementInline]

    def response_add(self, request, obj, post_url_continue=None):
        """
        This makes the response after adding go to another
        app's changelist for some model
        """

        url = reverse(f'admin:{obj.campaign._meta.app_label}_{obj.campaign._meta.model_name}_change',
                      args=str(obj.campaign.pk)) + "#issues-tab"

        return HttpResponseRedirect(
            url
        )

    def response_change(self, request, obj, post_url_continue=None):
        """
        This makes the response go to the newly created
        model's change page without using reverse
        """
        url = reverse(f'admin:{obj.campaign._meta.app_label}_{obj.campaign._meta.model_name}_change',
                      args=str(obj.campaign.pk)) + "#issues-tab"

        return HttpResponseRedirect(
            url
        )


admin.site.register(Recipient)
admin.site.register(Statement)
admin.site.register(Draft)
admin.site.register(StatementSubmission)
admin.site.register(SessionMeta)


@receiver(post_save, sender=Image)
def resize_image_hook(sender, **kwargs):
    i = kwargs.get('instance')
    if not i or not i.image:
        return

    filepath = pathlib.Path(i.image.name)
    stem = filepath.stem
    fullfilepath = os.path.join(settings.MEDIA_ROOT, filepath)

    im = Img.open(fullfilepath)
    ogwidth, ogheight = im.size
    newsize = (300, 300)
    im_resized = im.resize(newsize)

    newpath = filepath.with_stem(stem + "_resized")
    newfilepath = os.path.join(settings.MEDIA_ROOT, newpath)
    im_resized.save(newfilepath)

    cur_row = Image.objects.filter(id=i.id)
    cur_row.update(image_small=newpath)
