from django.db import models

from util import enums


class Campaign(models.Model):
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now=True)
    start_date = models.DateField(auto_now=True)
    end_date = models.DateField(null=True)
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = "campaign"

    def __str__(self):
        return self.name


class CampaignRecipient(models.Model):
    email_address = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now=True)
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE, related_name='recipients')

    class Meta:
        db_table = "campaign_recipient"


class MediaType(models.Model):
    code = models.CharField(max_length=64, choices=enums.MediaType.choices(), null=False, blank=False)
    description = models.CharField(max_length=255)
    min_width = models.IntegerField(default=None)
    max_width = models.IntegerField(default=None)
    min_height = models.IntegerField(default=None)
    max_height = models.IntegerField(default=None)
    created = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "media_type"


class CampaignMedia(models.Model):
    url = models.CharField(max_length=1024, null=False, blank=False)
    created = models.DateTimeField(auto_now=True)
    media_type = models.ForeignKey('MediaType', on_delete=models.CASCADE, null=False, blank=False)
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE, related_name='media')

    class Meta:
        db_table = "campaign_media"


class Issue(models.Model):
    prompt_text = models.CharField(max_length=1024)
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE, related_name='issues')
    created = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "issue"

    def __str__(self):
        return self.prompt_text


class Statement(models.Model):
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE)
    statement_text = models.CharField(max_length=1024)
    issue = models.ForeignKey('Issue', on_delete=models.CASCADE, related_name='statements')
    created = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "statement"

    def __str__(self):
        return self.statement_text


class CampaignResponse(models.Model):
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE, related_name='responses')
    created = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "campaign_response"


class StatementSelection(models.Model):
    campaign_response = models.ForeignKey('CampaignResponse', on_delete=models.CASCADE,
                                          related_name='selected_statements')
    issue = models.ForeignKey('Issue', on_delete=models.CASCADE)
    statement = models.ForeignKey('Statement', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "statement_selection"
