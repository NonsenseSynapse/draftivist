from django.db import models


class Campaign(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now=True)
    start_date = models.DateField(auto_now=True)
    end_date = models.DateField(null=True)
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = "campaign"

    def __str__(self):
        return self.name


class Recipient(models.Model):
    email_address = models.EmailField()
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now=True)
    campaigns = models.ManyToManyField(Campaign, related_name='recipients')

    class Meta:
        db_table = "recipient"

    def __str__(self):
        return self.email_address


class Issue(models.Model):
    campaign = models.ForeignKey(Campaign, null=True, on_delete=models.SET_NULL, related_name='issues')
    prompt_text = models.CharField(max_length=1024)
    created = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "issue"

    def __str__(self):
        return self.prompt_text


class Statement(models.Model):
    issue = models.ForeignKey(Issue, null=True, on_delete=models.SET_NULL, related_name='statements')
    statement_text = models.CharField(max_length=1024)
    created = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "statement"

    def __str__(self):
        return self.statement_text


class Draft(models.Model):
    campaign = models.ForeignKey(Campaign, null=True, on_delete=models.SET_NULL, related_name='drafts')
    issue = models.ForeignKey(Issue, null=True, on_delete=models.SET_NULL, related_name='drafts')
    statements = models.ManyToManyField(Statement, related_name='drafts')
    created = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False) # is_sent? in_progress?

    class Meta:
        db_table = "draft"

