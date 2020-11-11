from django.contrib import admin
from api.models.models import Campaign, Recipient, Issue, Statement, Draft

admin.site.register(Campaign)
admin.site.register(Recipient)
admin.site.register(Issue)
admin.site.register(Statement)
admin.site.register(Draft)
