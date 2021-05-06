import os
from django.db import models
from django.contrib.auth.models import User, Group
from django.utils.translation import gettext_lazy as _


class Campaign(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024)
    created = models.DateTimeField(auto_now=True)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    is_active = models.BooleanField(default=True)
    allow_custom_statements = models.BooleanField(default=True)
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, related_name='campaigns')

    class Meta:
        db_table = "campaign"
        ordering = ['id']

    def __str__(self):
        return self.name


class Image(models.Model):
    class Category(models.TextChoices):
        COVER = 'COVER', _('Cover')
        CUSTOM = 'CUSTOM', _('Custom')

    campaign = models.ForeignKey(Campaign, null=True, on_delete=models.SET_NULL, related_name='images')
    image = models.ImageField(upload_to='images/', null=True)
    image_small = models.ImageField(upload_to='images/', null=True)
    category = models.CharField(max_length=100, null=True, choices=Category.choices, default=Category.CUSTOM)

    class Meta:
        db_table = "image"
        ordering = ['id']
        unique_together = [['campaign', 'category']]

    def __str__(self):
        return self.image.url


class Recipient(models.Model):
    email_address = models.EmailField()
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    created = models.DateTimeField(auto_now=True)
    campaigns = models.ManyToManyField(Campaign, related_name='recipients', blank=True)

    class Meta:
        db_table = "recipient"
        ordering = ['id']

    def __str__(self):
        return self.full_name


class Issue(models.Model):
    campaign = models.ForeignKey(Campaign, null=True, on_delete=models.SET_NULL, related_name='issues')
    text = models.CharField(max_length=1024)
    created = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "issue"
        ordering = ['id']

    def __str__(self):
        return self.text


class Statement(models.Model):
    issue = models.ForeignKey(Issue, null=True, on_delete=models.SET_NULL, related_name='statements')
    text = models.CharField(max_length=1024)
    created = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    submission_id = models.ForeignKey('StatementSubmission', null=True, on_delete=models.SET_NULL, related_name='statement')

    class Meta:
        db_table = "statement"
        ordering = ['id']

    def __str__(self):
        return self.text


class Draft(models.Model):
    campaign = models.ForeignKey(Campaign, null=True, on_delete=models.SET_NULL, related_name='drafts')
    issue = models.ForeignKey(Issue, null=True, on_delete=models.SET_NULL, related_name='drafts')
    statements = models.ManyToManyField(Statement, related_name='drafts')
    created = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, default='STARTED', choices=[('STARTED', 'Started'), ('IN_PROGRESS', 'In Progress'), ('COMPLETED', 'Completed')])
    session_key = models.CharField(max_length=40, null=True)

    class Meta:
        db_table = "draft"
        ordering = ['id']

    def __str__(self):
        return f'{str(self.pk)}: {self.campaign} / {self.statements}'


class StatementSubmission(models.Model):
    issue = models.ForeignKey(Issue, null=True, on_delete=models.SET_NULL, related_name='+')
    text = models.CharField(max_length=1024)
    created = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, default='NEEDS_REVIEW', choices=[('NEEDS_REVIEW', 'Needs Review'), ('REJECTED', 'Rejected'), ('ACCEPTED', 'Accepted')])
    reviewer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='+')

    class Meta:
        db_table = "statement_submission"
        ordering = ['id']

    def __str__(self):
        return self.text


class SessionMeta(models.Model):
    session_key = models.CharField(max_length=40)
    remote_addr = models.CharField(max_length=40, null=True, blank=True)
    user_agent = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = "session_meta"
        ordering = ['id']

    def __str__(self):
        return f'{str(self.pk)}: {self.session_key}'
