"""cyoa URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers

from frontend.views import index
from api.views.views import (
	CampaignViewSet,
	RecipientViewSet,
	IssueViewSet,
	StatementViewSet,
	DraftViewSet,
	StatementSubmissionViewSet,
	SessionMetaViewSet,
)

router = routers.DefaultRouter()
router.register(r'campaign', CampaignViewSet)
router.register(r'recipient', RecipientViewSet)
router.register(r'issue', IssueViewSet)
router.register(r'statement', StatementViewSet)
router.register(r'draft', DraftViewSet)
router.register(r'statementsubmission', StatementSubmissionViewSet)
router.register(r'sessionmeta', SessionMetaViewSet)

urlpatterns = [
    path('', index, name='index'),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    re_path(r'^.*/$', index, name='ui_catchall')
]

if not settings.IS_PROD:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
