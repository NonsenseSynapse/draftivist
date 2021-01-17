from django.db import models
from django.contrib.auth.models import User, Group
from phonenumber_field.modelfields import PhoneNumberField


class Campaign(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024)
    created = models.DateTimeField(auto_now=True)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    is_active = models.BooleanField(default=True)
    allow_custom_statements = models.BooleanField(default=True)
    organization = models.ForeignKey('Organization', on_delete=models.SET_NULL, null=True, related_name='campaigns')

    class Meta:
        db_table = "campaign"
        ordering = ['id']

    def __str__(self):
        return self.name


class Recipient(models.Model):
    email_address = models.EmailField()
    full_name = models.CharField(max_length=255)
    phone = PhoneNumberField()
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


class Organization(models.Model):
    group = models.OneToOneField(Group, on_delete=models.SET_NULL, null=True, related_name='organization')

    class Meta:
        db_table = "organization"
        ordering = ['id']

    def __str__(self):
        return self.group.name


class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, related_name='member')
    contact = PhoneNumberField()

    class Meta:
        db_table = "member"
        ordering = ['id']

    def __str__(self):
        return self.user.username