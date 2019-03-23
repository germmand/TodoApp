from django.urls import re_path, include
from rest_framework import routers

from Todoes.views import TodoStatusesViewSet

statusesRouter = routers.SimpleRouter()
statusesRouter.register(r'statuses', TodoStatusesViewSet)

urlpatterns = [
    re_path(r'^', include(statusesRouter.urls)),
]
