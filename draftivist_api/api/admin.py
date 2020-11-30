from django.contrib import admin
from api.models.models import Campaign, Recipient, Issue, Statement, Draft, StatementSubmission, SessionMeta, Organization, Member

admin.site.register(Campaign)
admin.site.register(Recipient)
admin.site.register(Issue)
admin.site.register(Statement)
admin.site.register(Draft)
admin.site.register(StatementSubmission)
admin.site.register(SessionMeta)
admin.site.register(Organization)
admin.site.register(Member)
