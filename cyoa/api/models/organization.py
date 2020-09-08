from django.db import models
from django.contrib.auth.models import User

from util import enums


class Organization(models.Model):
    name = models.TextField(max_length=1024, null=False, blank=False)
    created = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "organization"


class Member(models.Model):
    name = models.TextField(max_length=256, null=False, blank=False)
    created = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='member')
    organization = models.ForeignKey('Organization', on_delete=models.CASCADE, related_name='members')

    class Meta:
        db_table = "member"


class SocialMediaLinks(models.Model):
    link_source = models.TextField(max_length=64, choices=enums.SocialMediaSource.choices())
    url = models.TextField(max_length=1024, null=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "social_media_links"
