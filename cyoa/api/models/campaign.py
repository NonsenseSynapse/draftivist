from django.db import models


class Campaign(models.Model):
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Issue(models.Model):
    prompt_text = models.CharField(max_length=1024)
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE, related_name='issues')
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.prompt_text


class Statement(models.Model):
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE)
    statement_text = models.CharField(max_length=1024)
    issue = models.ForeignKey('Issue', on_delete=models.CASCADE, related_name='statements')
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.statement_text


class CampaignResponse(models.Model):
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE, related_name='responses')
    created = models.DateTimeField(auto_now=True)


class StatementSelection(models.Model):
    campaign_response = models.ForeignKey('CampaignResponse', on_delete=models.CASCADE,
                                          related_name='selected_statements')
    issue = models.ForeignKey('Issue', on_delete=models.CASCADE)
    statement = models.ForeignKey('Statement', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
